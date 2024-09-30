import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.constant";
import { categoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidationSchema } from "./category.validation";

const router = Router();

// ! for creating a category
router.post(
  "/create-category",
  auth(UserRole.admin),
  validateRequest(categoryValidationSchema.createCategoryValidationSchema),
  categoryController.createCategory
);

// ! for updating category
router.patch(
  "/update-category/:id",
  auth(UserRole.admin),
  validateRequest(categoryValidationSchema.updateCategoryValidationSchema),
  categoryController.updateCategory
);

//
export const categoryRouter = router;
