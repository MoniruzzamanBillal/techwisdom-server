import { ObjectId } from "mongoose";
import { z } from "zod";

const createPostVlidationSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(4, "Content is required"),
  isPremium: z.boolean(),
  isDeleted: z.boolean().optional().default(false),
  upvotes: z.number().optional().default(0),
  downvotes: z.number().optional().default(0),
  postImg: z.string().optional(),
  authorId: z.custom<ObjectId>((val) => typeof val === "object", {
    message: "Invalid author ID",
  }),
  category: z.custom<ObjectId>((val) => typeof val === "object", {
    message: "Invalid category ID",
  }),
  comments: z.array(
    z.custom<ObjectId>((val) => typeof val === "object", {
      message: "Invalid comment ID",
    })
  ),
});

//
export const postValidationSchemas = { createPostVlidationSchema };
