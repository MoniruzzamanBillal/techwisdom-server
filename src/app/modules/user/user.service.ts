/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import { userModel } from "./user.model";
import mongoose from "mongoose";

type FollowRequest = {
  followerId: string;
  followedUserId: string;
};

// ! for following a user
const followUserFromDb = async (payload: FollowRequest) => {
  // * followerId is your ID
  // * followedUserId is the ID of the person you want to follow
  const { followerId, followedUserId } = payload;

  // *  Check if the follower and followed user are not the same
  if (followerId === followedUserId) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot follow yourself.");
  }

  // *  Find both the follower and followed user
  const followerUser = await userModel.findById(followerId);
  const followedUser = await userModel.findById(followedUserId);

  if (!followerUser || !followedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found.");
  }

  const followedUserObjectId = new mongoose.Types.ObjectId(followedUserId);

  // *  Check if the user is already following
  if (followerUser.following.includes(followedUserObjectId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are already following this user."
    );
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // *  Add followed user's ID  in my  following list
    followerUser.following.push(followedUserObjectId);

    // * Add my ID to the followed user's followers list
    followedUser.followers.push(new mongoose.Types.ObjectId(followerId));

    await followerUser.save({ session });
    await followedUser.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return followerUser;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    // console.log(error);

    throw new Error(error);
  }
};

type UnfollowRequest = {
  followerId: string; // The user who wants to unfollow
  followedUserId: string; // The user to be unfollowed
};

// ! for unfollowing a user
const unfollowUserFromDb = async (payload: UnfollowRequest) => {
  // * followerId is your ID
  // * followedUserId is the ID of the person you want to unfollow
  const { followerId, followedUserId } = payload;

  // *  Check if the follower and followed user are not the same
  if (followerId === followedUserId) {
    throw new AppError(httpStatus.BAD_REQUEST, "You cannot unfollow yourself.");
  }

  // *  Find both the follower and followed user
  const followerUser = await userModel.findById(followerId);
  const followedUser = await userModel.findById(followedUserId);

  if (!followerUser || !followedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User not found.");
  }

  const followedUserObjectId = new mongoose.Types.ObjectId(followedUserId);

  // *  Check if the user is not following this user
  if (!followerUser.following.includes(followedUserObjectId)) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "You are not following this user."
    );
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // *  Remove followed user's ID from my following list
    followerUser.following = followerUser.following.filter(
      (id) => !id.equals(followedUserObjectId)
    );

    const followerUserIdObject = new mongoose.Types.ObjectId(followerId);

    // * Remove my ID from the followed user's followers list
    followedUser.followers = followedUser.followers.filter(
      (id) => !id.equals(followerUserIdObject)
    );

    await followerUser.save({ session });
    await followedUser.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return followerUser;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    // console.log(error);

    throw new Error(error);
  }
};

// ! for getting all user data
const getAllUsersFromDb = async () => {
  const result = await userModel.find();
  return result;
};

// ! for getting specific user data
const getSpecificUserFromDb = async (userId: string) => {
  const userData = await userModel
    .findById(userId)
    .populate("followers")
    .populate("following");

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user don't exist!!! ");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This user is deleted!!! ");
  }

  return userData;
};

//
export const userServices = {
  followUserFromDb,
  unfollowUserFromDb,
  getSpecificUserFromDb,
  getAllUsersFromDb,
};
