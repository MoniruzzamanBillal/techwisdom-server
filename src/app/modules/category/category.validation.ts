import { z } from "zod";

const createCategoryValidationSchema = z.object({
  cName: z.string().min(2, "Category name is required"),
});

//
export const categoryValidationSchema = {
  createCategoryValidationSchema,
};
