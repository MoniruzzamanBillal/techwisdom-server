import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { categoryModel } from "./category.model";

// ! cerate category in db
const createCategoryInDb = async (payload: { cName: string }) => {
  const result = await categoryModel.create(payload);

  return result;
};

// ! for getting all category
const getAllCategoryFromDb = async () => {
  const result = await categoryModel.find();

  return result;
};

// ! for getting single category
const getSingleCategoryFromDb = async (id: string) => {
  const categoryData = await categoryModel.findById(id);

  if (!categoryData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category don't exist!!! ");
  }

  if (categoryData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category is deleted!!! ");
  }

  return categoryData;
};

// ! update category in db
const updateCategoryInDb = async (payload: { cName: string }, id: string) => {
  const categoryData = await categoryModel.findById(id);

  if (!categoryData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category don't exist!!! ");
  }

  if (categoryData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category is deleted!!! ");
  }

  categoryData.cName = payload?.cName;
  await categoryData.save();

  return categoryData;
};

// ! delete category in db
const deleteCategoryInDb = async (id: string) => {
  const categoryData = await categoryModel.findById(id);

  if (!categoryData) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category don't exist!!! ");
  }

  if (categoryData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "This category is deleted!!! ");
  }

  categoryData.isDeleted = true;
  await categoryData.save();

  return categoryData;
};

//
export const categoryServices = {
  createCategoryInDb,
  updateCategoryInDb,
  deleteCategoryInDb,
  getAllCategoryFromDb,
  getSingleCategoryFromDb,
};
