import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { postValidationSchemas } from "./post.validation";

import { upload } from "../../util/SendImageCloudinary";
import { postController } from "./post.controller";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.constant";

const router = Router();

// ! for getting all post
router.get("/all-post", postController.getAllPost);

// ! for getting user post
router.get(
  "/user-post",
  auth(UserRole.admin, UserRole.user),
  postController.getUserPost
);

// ! for getting user post count
router.get(
  "/user-post-count",
  auth(UserRole.user),
  postController.getUserPostCount
);

// ! for getting user post like count
router.get(
  "/user-post-count",
  auth(UserRole.user),
  postController.getUserPostLikeCount
);

// ! for getting user post comment count
router.get(
  "/user-post-count",
  auth(UserRole.user),
  postController.getUserPostCommentCount
);

// ! for creating a post
router.post(
  "/create-post",
  auth(UserRole.admin, UserRole.user),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);

    next();
  },
  validateRequest(postValidationSchemas.createPostVlidationSchema),
  postController.craetePost
);

//! for giving upvotes
router.patch("/upvote-post", postController.upvotePost);

//! for giving downvotes
router.patch("/downvote-post", postController.downvotePost);

// ! for getting single post
router.get("/single-post/:id", postController.getSinglePost);

// ! for updating a post
router.patch(
  "/update-post/:id",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);
    next();
  },
  validateRequest(postValidationSchemas.updatePostVlidationSchema),
  postController.updatePost
);

// ! for deleting a post
router.patch("/delete-post/:id", postController.deletePost);

//
export const postRouter = router;
