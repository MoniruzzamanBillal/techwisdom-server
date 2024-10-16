import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { postServices } from "./post.service";

// ! create post
const craetePost = catchAsync(async (req, res) => {
  const result = await postServices.cratePostInDb(req.body, req.file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post created successfully",
    data: result,
  });
});

// ! get all  post
const getAllPost = catchAsync(async (req, res) => {
  const result = await postServices.getAllPostFromDb(req?.query);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post retrived successfully!!!",
    data: result,
  });
});

// ! get user post
const getUserPost = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await postServices.getUserPostFromDb(userId, req?.query);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Post retrived successfully!!!",
    data: result,
  });
});

// ! get user post count
const getUserPostCount = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await postServices.getUserPostCount(userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Post count retrived successfully!!!",
    data: result,
  });
});

// ! get user post like count
const getUserPostLikeCount = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await postServices.getUserPostLikeCount(userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Post like count retrived successfully!!!",
    data: result,
  });
});

// ! get user post comment count
const getUserPostCommentCount = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await postServices.getUserPostCommentCount(userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Post comment count retrived successfully!!!",
    data: result,
  });
});
// ! get user post dislike count
const getUserPostDislikeCount = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await postServices.getUserPostDislikeCount(userId);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User Post dislike count retrived successfully!!!",
    data: result,
  });
});

// ! get single post
const getSinglePost = catchAsync(async (req, res) => {
  const result = await postServices.getSinglePostFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post retrived successfully!!!",
    data: result,
  });
});

// ! update post
const updatePost = catchAsync(async (req, res) => {
  const result = await postServices.updatePostInDb(
    req.body,
    req.file,
    req.params.id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post updated successfully!!!",
    data: result,
  });
});

// ! delete post
const deletePost = catchAsync(async (req, res) => {
  const result = await postServices.deletePostFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post deleted successfully!!!",
    data: result,
  });
});

// ! for giving upvotes
const upvotePost = catchAsync(async (req, res) => {
  const result = await postServices.upvotePostInDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post upvoted successfully!!!",
    data: result,
  });
});

// ! for giving downvotes
const downvotePost = catchAsync(async (req, res) => {
  const result = await postServices.downvotePostInDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post downvoted successfully!!!",
    data: result,
  });
});

//
export const postController = {
  craetePost,
  updatePost,
  deletePost,
  getAllPost,
  getSinglePost,
  getUserPost,
  upvotePost,
  downvotePost,
  getUserPostCount,
  getUserPostLikeCount,
  getUserPostCommentCount,
  getUserPostDislikeCount,
};
