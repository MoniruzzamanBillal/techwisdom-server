import { ObjectId } from "mongoose";
import { z } from "zod";

const createPostVlidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required"),
    content: z.string().min(4, "Content is required"),
    isPremium: z.boolean(),
    isDeleted: z.boolean().optional().default(false),
    upvotes: z.number().optional().default(0),
    downvotes: z.number().optional().default(0),
    postImg: z.string().optional(),
    authorId: z.string(),
    category: z.string(),
    comments: z
      .array(
        z.custom<ObjectId>((val) => typeof val === "object", {
          message: "Invalid comment ID",
        })
      )
      .optional(),
  }),
});

const updatePostVlidationSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title is required").optional(),
    content: z.string().min(4, "Content is required").optional(),
    isPremium: z.boolean().optional(),
    isDeleted: z.boolean().optional().default(false).optional(),
    upvotes: z.number().optional().default(0).optional(),
    downvotes: z.number().optional().default(0).optional(),
    postImg: z.string().optional().optional(),
    authorId: z.string().optional(),
    category: z.string().optional(),
    comments: z
      .array(
        z.custom<ObjectId>((val) => typeof val === "object", {
          message: "Invalid comment ID",
        })
      )
      .optional(),
  }),
});

//
export const postValidationSchemas = {
  createPostVlidationSchema,
  updatePostVlidationSchema,
};
