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

//
export const categoryController = {
  createCategory,
  updateCategory,
};
