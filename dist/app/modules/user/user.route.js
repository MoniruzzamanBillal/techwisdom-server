"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// ! for getting all user
router.get("/all-user", user_controller_1.userController.getAllUsers);
// ! for getting all admin user
router.get("/all-admin-user", user_controller_1.userController.getAllAdminUsers);
// ! for following a user
router.patch("/follow-user", user_controller_1.userController.followUser);
// ! for unfollowing a user
router.patch("/unfollow-user", user_controller_1.userController.UnfollowUser);
// ! for getting specific user
router.get("/get-user/:id", user_controller_1.userController.getSpecificUser);
// ! for getting single  user
router.get("/get-single-user/:id", user_controller_1.userController.getSingleUser);
// ! for blocking specific user
router.patch("/block-user/:id", user_controller_1.userController.blockUser);
// ! for unblocking specific user
router.patch("/unblock-user/:id", user_controller_1.userController.unblockUser);
// ! for deleting specific user
router.patch("/delete-user/:id", user_controller_1.userController.deleteUser);
//
exports.userRouter = router;
