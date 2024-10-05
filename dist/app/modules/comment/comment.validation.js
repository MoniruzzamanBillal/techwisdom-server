"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidations = void 0;
const zod_1 = require("zod");
// ! create comment validation schema
const createCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, "Content is required"),
        postId: zod_1.z.string(),
        userId: zod_1.z.string(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
// ! update comment validation schema
const updateCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        content: zod_1.z.string().min(1, "Content is required"),
    }),
});
// ! delete comment validation schema
const deleteCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        postId: zod_1.z.string(),
    }),
});
//
exports.commentValidations = {
    createCommentValidationSchema,
    updateCommentValidationSchema,
    deleteCommentValidationSchema,
};
