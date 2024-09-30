import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { postValidationSchemas } from "./post.validation";

import { upload } from "../../util/SendImageCloudinary";
import { postController } from "./post.controller";

const router = Router();

// ! for getting all post
router.get("/all-post", postController.getAllPost);

// ! for getting single post
router.get("/single-post/:id", postController.getSinglePost);

// ! for creating a post
router.post(
  "/create-post",
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body?.data);

    next();
  },
  validateRequest(postValidationSchemas.createPostVlidationSchema),
  postController.craetePost
);

// ! for updating a post
router.patch(
  "/update-post/:id",
  validateRequest(postValidationSchemas.updatePostVlidationSchema),
  postController.updatePost
);

// ! for deleting a post
router.patch("/delete-post/:id", postController.deletePost);

//
export const postRouter = router;
