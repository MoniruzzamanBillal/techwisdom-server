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
exports.commentController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const comment_service_1 = require("./comment.service");
// ! creating a comment
const createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentServices.createCommentInDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Comment added successfully!!!!!",
        data: result,
    });
}));
// ! updating a comment
const updateComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentServices.updateComment(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Comment updated successfully!!!!!",
        data: result,
    });
}));
// ! delete a comment
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_service_1.commentServices.deleteCommentFromDb(req.body, req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Comment deleted successfully!!!!!",
        data: result,
    });
}));
//
exports.commentController = {
    createComment,
    updateComment,
    deleteComment,
};
