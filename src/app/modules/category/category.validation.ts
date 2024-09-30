import { z } from "zod";

const createCategoryValidationSchema = z.object({
  body: z.object({
    cName: z.string().min(2, "Category name is required"),
  }),
});

const updateCategoryValidationSchema = z.object({
  body: z
    .object({
      cName: z.string().min(2, "Category name is required"),
    })
    .optional(),
});

//
export const categoryValidationSchema = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
