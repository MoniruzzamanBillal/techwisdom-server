"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const comment_controller_1 = require("./comment.controller");
const router = (0, express_1.Router)();
// ! for creating a comment
router.post("/create-comment", (0, validateRequest_1.default)(comment_validation_1.commentValidations.createCommentValidationSchema), comment_controller_1.commentController.createComment);
// ! for updating a comment
router.patch("/update-comment/:id", (0, validateRequest_1.default)(comment_validation_1.commentValidations.updateCommentValidationSchema), comment_controller_1.commentController.updateComment);
// ! for deleting a comment
router.patch("/delete-comment/:id", (0, validateRequest_1.default)(comment_validation_1.commentValidations.deleteCommentValidationSchema), comment_controller_1.commentController.deleteComment);
//
exports.commentRouter = router;
