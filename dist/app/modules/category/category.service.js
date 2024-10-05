"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const category_model_1 = require("./category.model");
// ! cerate category in db
const createCategoryInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.categoryModel.create(payload);
    return result;
});
// ! for getting all category
const getAllCategoryFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.categoryModel.find();
    return result;
});
// ! for getting single category
const getSingleCategoryFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield category_model_1.categoryModel.findById(id);
    if (!categoryData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category don't exist!!! ");
    }
    if (categoryData === null || categoryData === void 0 ? void 0 : categoryData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category is deleted!!! ");
    }
    return categoryData;
});
// ! update category in db
const updateCategoryInDb = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield category_model_1.categoryModel.findById(id);
    if (!categoryData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category don't exist!!! ");
    }
    if (categoryData === null || categoryData === void 0 ? void 0 : categoryData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category is deleted!!! ");
    }
    categoryData.cName = payload === null || payload === void 0 ? void 0 : payload.cName;
    yield categoryData.save();
    return categoryData;
});
// ! delete category in db
const deleteCategoryInDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield category_model_1.categoryModel.findById(id);
    if (!categoryData) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category don't exist!!! ");
    }
    if (categoryData === null || categoryData === void 0 ? void 0 : categoryData.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "This category is deleted!!! ");
    }
    categoryData.isDeleted = true;
    yield categoryData.save();
    return categoryData;
});
//
exports.categoryServices = {
    createCategoryInDb,
    updateCategoryInDb,
    deleteCategoryInDb,
    getAllCategoryFromDb,
    getSingleCategoryFromDb,
};
