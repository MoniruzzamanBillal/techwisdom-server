"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("./user.model");
const mongoose_1 = __importDefault(require("mongoose"));
// ! for following a user
const followUserFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // * followerId is your ID
    // * followedUserId is the ID of the person you want to follow
    const { followerId, followedUserId } = payload;
    // *  Check if the follower and followed user are not the same
    if (followerId === followedUserId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You cannot follow yourself.");
    }
    // *  Find both the follower and followed user
    const followerUser = yield user_model_1.userModel.findById(followerId);
    const followedUser = yield user_model_1.userModel.findById(followedUserId);
    if (!followerUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User not found.");
    }
    const followedUserObjectId = new mongoose_1.default.Types.ObjectId(followedUserId);
    // *  Check if the user is already following
    if (followerUser.following.includes(followedUserObjectId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are already following this user.");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // *  Add followed user's ID  in my  following list
        followerUser.following.push(followedUserObjectId);
        // * Add my ID to the followed user's followers list
        followedUser.followers.push(new mongoose_1.default.Types.ObjectId(followerId));
        yield followerUser.save({ session });
        yield followedUser.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return followerUser;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        // console.log(error);
        throw new Error(error);
    }
});
// ! for unfollowing a user
const unfollowUserFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // * followerId is your ID
    // * followedUserId is the ID of the person you want to unfollow
    const { followerId, followedUserId } = payload;
    // *  Check if the follower and followed user are not the same
    if (followerId === followedUserId) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You cannot unfollow yourself.");
    }
    // *  Find both the follower and followed user
    const followerUser = yield user_model_1.userModel.findById(followerId);
    const followedUser = yield user_model_1.userModel.findById(followedUserId);
    if (!followerUser || !followedUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User not found.");
    }
    const followedUserObjectId = new mongoose_1.default.Types.ObjectId(followedUserId);
    // *  Check if the user is not following this user
    if (!followerUser.following.includes(followedUserObjectId)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "You are not following this user.");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // *  Remove followed user's ID from my following list
        followerUser.following = followerUser.following.filter((id) => !id.equals(followedUserObjectId));
        const followerUserIdObject = new mongoose_1.default.Types.ObjectId(followerId);
        // * Remove my ID from the followed user's followers list
        followedUser.followers = followedUser.followers.filter((id) => !id.equals(followerUserIdObject));
        yield followerUser.save({ session });
        yield followedUser.save({ session });
        yield session.commitTransaction();
        yield session.endSession();
        return followerUser;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        // console.log(error);
        throw new Error(error);
    }
});
// ! for getting specific user data
const getSpecificUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.userModel
        .findById(userId)
        .populate("followers")
        .populate("following");
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (userData === null || userData === void 0 ? void 0 : userData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    return userData;
});
//
exports.userServices = {
    followUserFromDb,
    unfollowUserFromDb,
    getSpecificUserFromDb,
};
