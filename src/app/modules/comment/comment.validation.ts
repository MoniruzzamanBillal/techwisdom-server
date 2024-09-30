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

//
export const commentValidations = {
  createCommentValidationSchema,
};
