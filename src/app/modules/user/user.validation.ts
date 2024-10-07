import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format").min(4, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// ! create admin user
const createAdminUser = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    userRole: z.string().min(1, "userRole is required"),
    email: z.string().email("Invalid email format").min(4, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

// ! update  user
const updateAdminUser = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    userRole: z.string().min(1, "userRole is required").optional(),
    email: z
      .string()
      .email("Invalid email format")
      .min(4, "Email is required")
      .optional(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .optional(),
  }),
});

//
export const userValidationSchemas = {
  createUserValidationSchema,
  createAdminUser,
  updateAdminUser,
};
