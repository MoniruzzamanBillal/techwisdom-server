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
  const result = await postServices.getAllPostFromDb();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post retrived successfully!!!",
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

//
export const postController = {
  craetePost,
  updatePost,
  deletePost,
  getAllPost,
  getSinglePost,
};
