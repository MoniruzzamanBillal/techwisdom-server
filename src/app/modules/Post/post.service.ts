import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TPost } from "./post.interface";
import { postModel } from "./post.model";
import mongoose, { Schema, Types } from "mongoose";
import Querybuilder from "../../builder/Queryuilder";

const postSearchableFields = ["title", "content"];

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
const getAllPostFromDb = async (query: Record<string, unknown>) => {

  // console.log( 'in post services = ' ,  query)


  let postQueryBuilder 
  if(query?.type) {
    postQueryBuilder = postModel.find({ category : query?.type }).sort( { upvotes: -1 } );
  }

  else{
    postQueryBuilder = postModel.find().sort({ upvotes: -1 });
  }

  const postQuery = new Querybuilder(postQueryBuilder , query  ).search(postSearchableFields).sort()

  const resultModified = await postQuery?.queryModel.populate("authorId")
  .populate("category")
  .populate("comments");
  // console.log(resultModified)




  return resultModified;
};

// ! for getting user posts
const getUserPostFromDb = async (userId: string , query: Record<string, unknown>) => {

  console.log("in user post = " , query )


  const userPostQuery = postModel.find({ authorId: userId });

  let postQueryBuilder 
  if(query?.type) {
    postQueryBuilder = userPostQuery.find({ category : query?.type }).sort( { upvotes: -1 } );
  }
  
  else{
    postQueryBuilder = userPostQuery.find().sort({ upvotes: -1 });
  }

  const postQuery = new Querybuilder(postQueryBuilder , query  ).search(postSearchableFields).sort()
  const resultModified = await postQuery?.queryModel.populate("category")



  // const result = await postModel.find({ authorId: userId });




  return resultModified;
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



type TUpvoteDownvote = {
  postId: string;
  userId: string;
};

// ! for upvoting post
const upvotePostInDb = async (payload: TUpvoteDownvote) => {
  const { postId, userId } = payload;

  const post = await postModel.findById(postId);

  if (!post) {
    throw new Error("Post not found !!!");
  }

  if (post?.isDeleted) {
    throw new Error("Post is deleted !!!");
  }

  // *  Check if the user has already upvoted

  const objectIdUserId = new mongoose.Types.ObjectId(userId);

  if (
    post.upvotedBy.some((id) => id.toString() === objectIdUserId.toString())
  ) {
    throw new Error("User has already upvoted this post");
  }

  // Remove from downvotedBy if the user previously downvoted
  post.downvotedBy = post.downvotedBy.filter(
    (id) => id.toString() !== objectIdUserId.toString()
  );

  if (post.downvotes && post.downvotedBy.length < post.downvotes) {
    post.downvotes -= 1;
  }

  // Add userId to upvotedBy array and increment upvotes

  await postModel.findByIdAndUpdate(postId, {
    $push: { upvotedBy: objectIdUserId },
  });

  post.upvotes = (post.upvotes || 0) + 1;

  await post.save();

  console.log(post);

  const result = await postModel.findById(postId);
  return result;
};

// ! for downvoting post
const downvotePostInDb = async (payload: TUpvoteDownvote) => {
  const { postId, userId } = payload;

  const post = await postModel.findById(postId);

  if (!post) {
    throw new Error("Post not found !!!");
  }

  if (post?.isDeleted) {
    throw new Error("Post is deleted !!!");
  }

  const objectIdUserId = new mongoose.Types.ObjectId(userId);

  // Check if the user has already downvoted
  if (
    post.downvotedBy.some((id) => id.toString() === objectIdUserId.toString())
  ) {
    throw new Error("User has already downvoted this post");
  }

  // Remove from upvotedBy if the user previously upvoted
  post.upvotedBy = post.upvotedBy.filter(
    (id) => id.toString() !== objectIdUserId.toString()
  );

  // Decrease upvotes if applicable
  const currentUpvotes = post.upvotes ?? 0;
  if (post.upvotedBy && post.upvotedBy.length < currentUpvotes) {
    post.upvotes = currentUpvotes - 1;
  }

  // Add userId to downvotedBy array and increment downvotes
  await postModel.findByIdAndUpdate(postId, {
    $push: { downvotedBy: objectIdUserId },
  });

  post.downvotes = (post.downvotes || 0) + 1;

  await post.save();
  const result = await postModel.findById(postId);
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
  upvotePostInDb,
  downvotePostInDb,
};
