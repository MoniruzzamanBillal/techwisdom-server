"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchemas = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        email: zod_1.z.string().email("Invalid email format").min(4, "Email is required"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    }),
});
// ! create admin user
const createAdminUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required"),
        userRole: zod_1.z.string().min(1, "userRole is required"),
        email: zod_1.z.string().email("Invalid email format").min(4, "Email is required"),
        password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    }),
});
// ! update  user
const updateAdminUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, "Name is required").optional(),
        userRole: zod_1.z.string().min(1, "userRole is required").optional(),
        email: zod_1.z
            .string()
            .email("Invalid email format")
            .min(4, "Email is required")
            .optional(),
        password: zod_1.z
            .string()
            .min(6, "Password must be at least 6 characters")
            .optional(),
    }),
});
//
exports.userValidationSchemas = {
    createUserValidationSchema,
    createAdminUser,
    updateAdminUser,
};
