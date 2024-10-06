import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TPost } from "./post.interface";
import { postModel } from "./post.model";
import { userModel } from "../user/user.model";
import mongoose from "mongoose";

// ! for crating a post
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cratePostInDb = async (payload: TPost, file: any) => {
  const name = payload?.title;
  const path = file?.path;

  const postImgresult = await SendImageCloudinary(path, name);

  const postImg = postImgresult?.secure_url;

  const result = await postModel.create({ ...payload, postImg });

  return result;
};

// ! for getting all post
const getAllPostFromDb = async () => {
  const result = await postModel
    .find()
    .populate("authorId")
    .populate("category")
    .populate("comments");

  return result;
};

// ! for getting single category
const getSinglePostFromDb = async (id: string) => {
  const postData = await postModel
    .findById(id)
    .populate("authorId")
    .populate("category")
    .populate({
      path: "comments",
      populate: {
        path: "userId",
      },
    });

  if (!postData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post don't exist!!! ");
  }

  if (postData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post is deleted!!! ");
  }

  return postData;
};

// ! for updating a post
const updatePostInDb = async (
  payload: Partial<TPost>,
  file: any,
  id: string
) => {
  const name = payload?.title as string;
  const path = file?.path;

  const postImgresult = await SendImageCloudinary(path, name);

  const postImg = postImgresult?.secure_url;

  const postData = await postModel.findById(id);

  if (!postData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post don't exist!!! ");
  }

  if (postData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post is deleted!!! ");
  }

  const result = await postModel.findByIdAndUpdate(
    id,
    { ...payload, postImg },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

// ! for deleting a post
const deletePostFromDb = async (id: string) => {
  const postData = await postModel.findById(id);

  if (!postData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post don't exist!!! ");
  }

  if (postData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post is deleted!!! ");
  }

  postData.isDeleted = true;

  await postData.save();

  return postData;
};

// ! for getting user posts
const getUserPostFromDb = async (userId: string) => {
  const result = await postModel.find({ authorId: userId });

  return result;
};

//
export const postServices = {
  cratePostInDb,
  updatePostInDb,
  deletePostFromDb,
  getAllPostFromDb,
  getSinglePostFromDb,
  getUserPostFromDb,
};
