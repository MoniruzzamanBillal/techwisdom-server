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

// ! update post
const updatePost = catchAsync(async (req, res) => {
  const result = await postServices.updatePostInDb(req.body, req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Post updated successfully!!!",
    data: result,
  });
});

//
export const postController = {
  craetePost,
  updatePost,
};
