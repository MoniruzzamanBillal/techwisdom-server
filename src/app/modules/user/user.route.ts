import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "./user.constant";
import { userController } from "./user.controller";

const router = Router();

// ! for following a user
router.patch(
  "/follow-user",
  auth(UserRole.user, UserRole.admin),
  userController.followUser
);

// ! for unfollowing a user
router.patch(
  "/unfollow-user",
  auth(UserRole.user, UserRole.admin),
  userController.UnfollowUser
);

//
export const userRouter = router;
