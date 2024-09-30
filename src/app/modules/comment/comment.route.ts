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

//
export const commentRouter = router;
