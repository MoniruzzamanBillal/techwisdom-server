import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";

import { categoryServices } from "./category.service";

// !create category
const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryInDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully !!!",
    data: result,
  });
});

// ! getting all  category
const getAllCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoryFromDb();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category retrived successfully !!!",
    data: result,
  });
});

// ! getting specific  category
const getSingleCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.getSingleCategoryFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category retrived successfully !!!",
    data: result,
  });
});

// ! update category data
const updateCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.updateCategoryInDb(
    req.body,
    req.params.id
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category updated successfully !!!",
    data: result,
  });
});

// ! delete category data
const deleteCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.deleteCategoryInDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category deleted successfully !!!",
    data: result,
  });
});

//
export const categoryController = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
};
