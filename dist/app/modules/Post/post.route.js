"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const post_validation_1 = require("./post.validation");
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const post_controller_1 = require("./post.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
// ! for getting all post
router.get("/all-post", post_controller_1.postController.getAllPost);
// ! for getting single post
router.get("/single-post/:id", post_controller_1.postController.getSinglePost);
// ! for creating a post
router.post("/create-post", (0, auth_1.default)(user_constant_1.UserRole.admin, user_constant_1.UserRole.user), SendImageCloudinary_1.upload.single("file"), (req, res, next) => {
    var _a;
    req.body = JSON.parse((_a = req.body) === null || _a === void 0 ? void 0 : _a.data);
    next();
}, (0, validateRequest_1.default)(post_validation_1.postValidationSchemas.createPostVlidationSchema), post_controller_1.postController.craetePost);
// ! for updating a post
router.patch("/update-post/:id", (0, validateRequest_1.default)(post_validation_1.postValidationSchemas.updatePostVlidationSchema), post_controller_1.postController.updatePost);
// ! for deleting a post
router.patch("/delete-post/:id", post_controller_1.postController.deletePost);
//
exports.postRouter = router;
