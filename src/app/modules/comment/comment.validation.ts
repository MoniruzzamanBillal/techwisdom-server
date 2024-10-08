import { z } from "zod";

// ! create comment validation schema
const createCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Content is required"),
    postId: z.string(),
    userId: z.string(),
    isDeleted: z.boolean().optional(),
  }),
});

// ! update comment validation schema
const updateCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Content is required"),
  }),
});

// ! delete comment validation schema
const deleteCommentValidationSchema = z.object({
  body: z.object({
    postId: z.string(),
  }),
});

//
export const commentValidations = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
  deleteCommentValidationSchema,
};
