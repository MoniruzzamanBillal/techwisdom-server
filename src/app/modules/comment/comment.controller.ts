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

//
export const commentController = {
  createComment,
};
