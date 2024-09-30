import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { postModel } from "../Post/post.model";
import { TComment } from "./comment.interface";
import { userModel } from "../user/user.model";
import { commentModel } from "./comment.model";
import mongoose from "mongoose";

// ! create commment in db
const createCommentInDb = async (payload: TComment) => {
  const { userId, postId } = payload;

  const postData = await postModel.findById(postId);

  if (!postData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post don't exist!!! ");
  }

  if (postData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post is deleted!!! ");
  }

  const userData = await userModel.findById(userId);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post don't exist!!! ");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This post is deleted!!! ");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const newComment = await commentModel.create([payload], { session });

    const commentData = newComment[0];

    await postModel.findByIdAndUpdate(
      postId,
      {
        $push: { comments: commentData._id },
      },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();

    return newComment;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new Error(error);
  }
};

// ! updating comment data
const updateComment = async (payload: Partial<TComment>, id: string) => {
  const commentData = await commentModel.findById(id);

  if (!commentData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This comment don't exist!!! ");
  }

  if (commentData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This comment is deleted!!! ");
  }

  const result = await commentModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return result;
};

//

export const commentServices = { createCommentInDb, updateComment };
