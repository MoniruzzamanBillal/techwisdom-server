"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const post_service_1 = require("./post.service");
// ! create post
const craetePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.cratePostInDb(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post created successfully",
        data: result,
    });
}));
// ! get all  post
const getAllPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.getAllPostFromDb(req === null || req === void 0 ? void 0 : req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post retrived successfully!!!",
        data: result,
    });
}));
// ! get single post
const getUserPost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const result = yield post_service_1.postServices.getUserPostFromDb(userId, req === null || req === void 0 ? void 0 : req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User Post retrived successfully!!!",
        data: result,
    });
}));
// ! get single post
const getSinglePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.getSinglePostFromDb(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post retrived successfully!!!",
        data: result,
    });
}));
// ! update post
const updatePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.updatePostInDb(req.body, req.file, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post updated successfully!!!",
        data: result,
    });
}));
// ! delete post
const deletePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.deletePostFromDb(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post deleted successfully!!!",
        data: result,
    });
}));
// ! for giving upvotes
const upvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.upvotePostInDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post upvoted successfully!!!",
        data: result,
    });
}));
// ! for giving downvotes
const downvotePost = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_service_1.postServices.downvotePostInDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Post downvoted successfully!!!",
        data: result,
    });
}));
//
exports.postController = {
    craetePost,
    updatePost,
    deletePost,
    getAllPost,
    getSinglePost,
    getUserPost,
    upvotePost,
    downvotePost,
};
