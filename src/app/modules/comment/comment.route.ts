import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { commentValidations } from "./comment.validation";
import { commentController } from "./comment.controller";

const router = Router();

// ! for creating a comment
router.post(
  "/create-comment",
  validateRequest(commentValidations.createCommentValidationSchema),
  commentController.createComment
);

// ! for updating a comment
router.patch(
  "/update-comment/:id",
  validateRequest(commentValidations.updateCommentValidationSchema),
  commentController.updateComment
);

//
export const commentRouter = router;
