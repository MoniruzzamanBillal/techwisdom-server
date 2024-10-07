import { Router } from "express";

import { userController } from "./user.controller";

const router = Router();

// ! for getting all user
router.get("/all-user", userController.getAllUsers);

// ! for getting all admin user
router.get("/all-admin-user", userController.getAllAdminUsers);

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

// ! for getting specific user
router.get("/get-user/:id", userController.getSpecificUser);

// ! for blocking specific user
router.patch("/block-user/:id", userController.blockUser);

// ! for unblocking specific user
router.patch("/unblock-user/:id", userController.unblockUser);

// ! for deleting specific user
router.patch("/delete-user/:id", userController.deleteUser);

//
export const userRouter = router;
