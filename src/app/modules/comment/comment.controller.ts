import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { commentServices } from "./comment.service";

// ! creating a comment
const createComment = catchAsync(async (req, res) => {
  const result = await commentServices.createCommentInDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment added successfully!!!!!",
    data: result,
  });
});

// ! updating a comment
const updateComment = catchAsync(async (req, res) => {
  const result = await commentServices.updateComment(req.body, req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment updated successfully!!!!!",
    data: result,
  });
});

// ! delete a comment
const deleteComment = catchAsync(async (req, res) => {
  const result = await commentServices.deleteCommentFromDb(
    req.body,
    req.params.id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Comment deleted successfully!!!!!",
    data: result,
  });
});

//
export const commentController = {
  createComment,
  updateComment,
  deleteComment,
};
