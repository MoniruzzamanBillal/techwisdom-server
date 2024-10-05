"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationSchemas = void 0;
const zod_1 = require("zod");
const createPostVlidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, "Title is required"),
        content: zod_1.z.string().min(4, "Content is required"),
        isPremium: zod_1.z.boolean(),
        isDeleted: zod_1.z.boolean().optional().default(false),
        upvotes: zod_1.z.number().optional().default(0),
        downvotes: zod_1.z.number().optional().default(0),
        postImg: zod_1.z.string().optional(),
        authorId: zod_1.z.string(),
        category: zod_1.z.string(),
        comments: zod_1.z
            .array(zod_1.z.custom((val) => typeof val === "object", {
            message: "Invalid comment ID",
        }))
            .optional(),
    }),
});
const updatePostVlidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(3, "Title is required").optional(),
        content: zod_1.z.string().min(4, "Content is required").optional(),
        isPremium: zod_1.z.boolean().optional(),
        isDeleted: zod_1.z.boolean().optional().default(false).optional(),
        upvotes: zod_1.z.number().optional().default(0).optional(),
        downvotes: zod_1.z.number().optional().default(0).optional(),
        postImg: zod_1.z.string().optional().optional(),
        authorId: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        comments: zod_1.z
            .array(zod_1.z.custom((val) => typeof val === "object", {
            message: "Invalid comment ID",
        }))
            .optional(),
    }),
});
//
exports.postValidationSchemas = {
    createPostVlidationSchema,
    updatePostVlidationSchema,
};
