"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryValidationSchema = void 0;
const zod_1 = require("zod");
const createCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        cName: zod_1.z.string().min(2, "Category name is required"),
    }),
});
const updateCategoryValidationSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        cName: zod_1.z.string().min(2, "Category name is required"),
    })
        .optional(),
});
//
exports.categoryValidationSchema = {
    createCategoryValidationSchema,
    updateCategoryValidationSchema,
};
