"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const category_controller_1 = require("./category.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
// ! for getting all category
router.get("/all-category", (0, auth_1.default)(user_constant_1.UserRole.admin), category_controller_1.categoryController.getAllCategory);
// ! for getting single category
router.get("/single-category/:id", (0, auth_1.default)(user_constant_1.UserRole.admin), category_controller_1.categoryController.getSingleCategory);
// ! for creating a category
router.post("/create-category", (0, auth_1.default)(user_constant_1.UserRole.admin), (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.createCategoryValidationSchema), category_controller_1.categoryController.createCategory);
// ! for updating category
router.patch("/update-category/:id", (0, auth_1.default)(user_constant_1.UserRole.admin), (0, validateRequest_1.default)(category_validation_1.categoryValidationSchema.updateCategoryValidationSchema), category_controller_1.categoryController.updateCategory);
// ! for deleting category
router.patch("/delete-category/:id", (0, auth_1.default)(user_constant_1.UserRole.admin), category_controller_1.categoryController.deleteCategory);
//
exports.categoryRouter = router;
