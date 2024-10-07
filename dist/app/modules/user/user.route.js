"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// ! for getting specific user
router.get("/get-user/:id", user_controller_1.userController.getSpecificUser);
// ! for following a user
router.patch("/follow-user", user_controller_1.userController.followUser);
// ! for unfollowing a user
router.patch("/unfollow-user", user_controller_1.userController.UnfollowUser);
//
exports.userRouter = router;
