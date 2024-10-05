import { Router } from "express";
import auth from "../../middleware/auth";
import { UserRole } from "../user/user.constant";
import { categoryController } from "./category.controller";
import validateRequest from "../../middleware/validateRequest";
import { categoryValidationSchema } from "./category.validation";

const router = Router();

// ! for getting all category
router.get("/all-category", categoryController.getAllCategory);

// ! for getting single category
router.get("/single-category/:id", categoryController.getSingleCategory);

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

// ! for deleting category
router.patch(
  "/delete-category/:id",
  auth(UserRole.admin),
  categoryController.deleteCategory
);

//
export const categoryRouter = router;
