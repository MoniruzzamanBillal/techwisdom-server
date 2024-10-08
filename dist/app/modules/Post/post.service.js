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
const mongoose_1 = __importDefault(require("mongoose"));
const Queryuilder_1 = __importDefault(require("../../builder/Queryuilder"));
const postSearchableFields = ["title", "content"];
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
const getAllPostFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log( 'in post services = ' ,  query)
    let postQueryBuilder;
    if (query === null || query === void 0 ? void 0 : query.type) {
        postQueryBuilder = post_model_1.postModel.find({ category: query === null || query === void 0 ? void 0 : query.type }).sort({ upvotes: -1 });
    }
    else {
        postQueryBuilder = post_model_1.postModel.find().sort({ upvotes: -1 });
    }
    const postQuery = new Queryuilder_1.default(postQueryBuilder, query).search(postSearchableFields).sort();
    const resultModified = yield (postQuery === null || postQuery === void 0 ? void 0 : postQuery.queryModel.populate("authorId").populate("category").populate("comments"));
    // console.log(resultModified)
    return resultModified;
});
// ! for getting user posts
const getUserPostFromDb = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("in user post = ", query);
    const userPostQuery = post_model_1.postModel.find({ authorId: userId });
    let postQueryBuilder;
    if (query === null || query === void 0 ? void 0 : query.type) {
        postQueryBuilder = userPostQuery.find({ category: query === null || query === void 0 ? void 0 : query.type }).sort({ upvotes: -1 });
    }
    else {
        postQueryBuilder = userPostQuery.find().sort({ upvotes: -1 });
    }
    const postQuery = new Queryuilder_1.default(postQueryBuilder, query).search(postSearchableFields).sort();
    const resultModified = yield (postQuery === null || postQuery === void 0 ? void 0 : postQuery.queryModel.populate("category"));
    // const result = await postModel.find({ authorId: userId });
    return resultModified;
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
// ! for upvoting post
const upvotePostInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId } = payload;
    const post = yield post_model_1.postModel.findById(postId);
    if (!post) {
        throw new Error("Post not found !!!");
    }
    if (post === null || post === void 0 ? void 0 : post.isDeleted) {
        throw new Error("Post is deleted !!!");
    }
    // *  Check if the user has already upvoted
    const objectIdUserId = new mongoose_1.default.Types.ObjectId(userId);
    if (post.upvotedBy.some((id) => id.toString() === objectIdUserId.toString())) {
        throw new Error("User has already upvoted this post");
    }
    // Remove from downvotedBy if the user previously downvoted
    post.downvotedBy = post.downvotedBy.filter((id) => id.toString() !== objectIdUserId.toString());
    if (post.downvotes && post.downvotedBy.length < post.downvotes) {
        post.downvotes -= 1;
    }
    // Add userId to upvotedBy array and increment upvotes
    yield post_model_1.postModel.findByIdAndUpdate(postId, {
        $push: { upvotedBy: objectIdUserId },
    });
    post.upvotes = (post.upvotes || 0) + 1;
    yield post.save();
    console.log(post);
    const result = yield post_model_1.postModel.findById(postId);
    return result;
});
// ! for downvoting post
const downvotePostInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { postId, userId } = payload;
    const post = yield post_model_1.postModel.findById(postId);
    if (!post) {
        throw new Error("Post not found !!!");
    }
    if (post === null || post === void 0 ? void 0 : post.isDeleted) {
        throw new Error("Post is deleted !!!");
    }
    const objectIdUserId = new mongoose_1.default.Types.ObjectId(userId);
    // Check if the user has already downvoted
    if (post.downvotedBy.some((id) => id.toString() === objectIdUserId.toString())) {
        throw new Error("User has already downvoted this post");
    }
    // Remove from upvotedBy if the user previously upvoted
    post.upvotedBy = post.upvotedBy.filter((id) => id.toString() !== objectIdUserId.toString());
    // Decrease upvotes if applicable
    const currentUpvotes = (_a = post.upvotes) !== null && _a !== void 0 ? _a : 0;
    if (post.upvotedBy && post.upvotedBy.length < currentUpvotes) {
        post.upvotes = currentUpvotes - 1;
    }
    // Add userId to downvotedBy array and increment downvotes
    yield post_model_1.postModel.findByIdAndUpdate(postId, {
        $push: { downvotedBy: objectIdUserId },
    });
    post.downvotes = (post.downvotes || 0) + 1;
    yield post.save();
    const result = yield post_model_1.postModel.findById(postId);
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
    upvotePostInDb,
    downvotePostInDb,
};
