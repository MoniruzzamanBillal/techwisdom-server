import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();

// ! for getting specific user
router.get("/get-user/:id", userController.getSpecificUser);

// ! for following a user
router.patch(
  "/follow-user",

  userController.followUser
);

// ! for unfollowing a user
router.patch(
  "/unfollow-user",

  userController.UnfollowUser
);

//
export const userRouter = router;
