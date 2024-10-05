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
exports.commentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const post_model_1 = require("../Post/post.model");
const user_model_1 = require("../user/user.model");
const comment_model_1 = require("./comment.model");
const mongoose_1 = __importDefault(require("mongoose"));
// ! create commment in db
const createCommentInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, postId } = payload;
    const postData = yield post_model_1.postModel.findById(postId);
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (postData === null || postData === void 0 ? void 0 : postData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    const userData = yield user_model_1.userModel.findById(userId);
    if (!userData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (userData === null || userData === void 0 ? void 0 : userData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newComment = yield comment_model_1.commentModel.create([payload], { session });
        const commentData = newComment[0];
        yield post_model_1.postModel.findByIdAndUpdate(postId, {
            $push: { comments: commentData._id },
        }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return newComment;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
// ! updating comment data
const updateComment = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = yield comment_model_1.commentModel.findById(id);
    if (!commentData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This comment don't exist!!! ");
    }
    if (commentData === null || commentData === void 0 ? void 0 : commentData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This comment is deleted!!! ");
    }
    const result = yield comment_model_1.commentModel.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
});
// ! deleting a comment
const deleteCommentFromDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const commentData = yield comment_model_1.commentModel.findById(id);
    const { postId } = payload;
    const postData = yield post_model_1.postModel.findById(postId);
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (postData === null || postData === void 0 ? void 0 : postData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    if (!commentData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This comment don't exist!!! ");
    }
    if (commentData === null || commentData === void 0 ? void 0 : commentData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This comment is deleted!!! ");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const result = yield comment_model_1.commentModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true, session });
        yield post_model_1.postModel.findByIdAndUpdate(postId, {
            $pull: { comments: id },
        }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
//
exports.commentServices = {
    createCommentInDb,
    updateComment,
    deleteCommentFromDb,
};
