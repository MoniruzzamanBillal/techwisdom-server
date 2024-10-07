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
exports.postServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const post_model_1 = require("./post.model");
// ! for crating a post
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cratePostInDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.title;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const postImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const postImg = postImgresult === null || postImgresult === void 0 ? void 0 : postImgresult.secure_url;
    const result = yield post_model_1.postModel.create(Object.assign(Object.assign({}, payload), { postImg }));
    return result;
});
// ! for getting all post
const getAllPostFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.postModel
        .find()
        .populate("authorId")
        .populate("category")
        .populate("comments");
    return result;
});
// ! for getting single category
const getSinglePostFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = yield post_model_1.postModel
        .findById(id)
        .populate("authorId")
        .populate("category")
        .populate({
        path: "comments",
        populate: {
            path: "userId",
        },
    });
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (postData === null || postData === void 0 ? void 0 : postData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    return postData;
});
// ! for updating a post
const updatePostInDb = (payload, file, id) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.title;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const postImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const postImg = postImgresult === null || postImgresult === void 0 ? void 0 : postImgresult.secure_url;
    const postData = yield post_model_1.postModel.findById(id);
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (postData === null || postData === void 0 ? void 0 : postData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    const result = yield post_model_1.postModel.findByIdAndUpdate(id, Object.assign(Object.assign({}, payload), { postImg }), {
        new: true,
        runValidators: true,
    });
    return result;
});
// ! for deleting a post
const deletePostFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = yield post_model_1.postModel.findById(id);
    if (!postData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post don't exist!!! ");
    }
    if (postData === null || postData === void 0 ? void 0 : postData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This post is deleted!!! ");
    }
    postData.isDeleted = true;
    yield postData.save();
    return postData;
});
// ! for getting user posts
const getUserPostFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.postModel.find({ authorId: userId });
    return result;
});
//
exports.postServices = {
    cratePostInDb,
    updatePostInDb,
    deletePostFromDb,
    getAllPostFromDb,
    getSinglePostFromDb,
    getUserPostFromDb,
};
