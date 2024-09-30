import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { categoryModel } from "./category.model";

// ! cerate category in db
const createCategoryInDb = async (payload: { cName: string }) => {
  const result = await categoryModel.create(payload);

  return result;
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

//
export const categoryServices = {
  createCategoryInDb,
  updateCategoryInDb,
};
