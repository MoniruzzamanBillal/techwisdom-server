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
exports.authServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const user_model_1 = require("../user/user.model");
const auth_util_1 = require("./auth.util");
const config_1 = __importDefault(require("../../config"));
const sendEmail_1 = require("../../util/sendEmail");
// ! create user in database
const createUserIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.name;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const userImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const userImg = userImgresult === null || userImgresult === void 0 ? void 0 : userImgresult.secure_url;
    const result = yield user_model_1.userModel.create(Object.assign(Object.assign({}, payload), { profilePicture: userImg }));
    return result;
});
// ! create admin
const createAdminIntoDb = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.name;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const userImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const userImg = userImgresult === null || userImgresult === void 0 ? void 0 : userImgresult.secure_url;
    const result = yield user_model_1.userModel.create(Object.assign(Object.assign({}, payload), { profilePicture: userImg }));
    return result;
});
// ! update admin
const updateUser = (payload, userId, file) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.name;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const userImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const userImg = userImgresult === null || userImgresult === void 0 ? void 0 : userImgresult.secure_url;
    const result = yield user_model_1.userModel.findByIdAndUpdate(userId, Object.assign(Object.assign({}, payload), { profilePicture: userImg }), { new: true });
    return result;
});
// ! sign in
const signInFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel
        .findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email })
        .populate("followers")
        .populate("following");
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User dont exist with this email !!!");
    }
    // console.log(payload?.password);
    // console.log(user?.password);
    // const isPasswordMatch = await bcrypt.compare(
    //   payload?.password,
    //   user?.password
    // );
    // console.log(isPasswordMatch);
    if ((payload === null || payload === void 0 ? void 0 : payload.password) !== (user === null || user === void 0 ? void 0 : user.password)) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, "Password don't match !!");
    }
    const userId = user === null || user === void 0 ? void 0 : user._id.toHexString();
    const userRole = user === null || user === void 0 ? void 0 : user.userRole;
    const jwtPayload = {
        userId,
        userRole,
    };
    const token = (0, auth_util_1.createToken)(jwtPayload, config_1.default.jwt_secret, "10d");
    return {
        user,
        token,
    };
    //
});
// ! send mail for reseting password
const resetMailLink = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield user_model_1.userModel
        .findOne({ email })
        .select(" name email role  ");
    if (!findUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User don't exist !!");
    }
    if (findUser === null || findUser === void 0 ? void 0 : findUser.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is deleted !!");
    }
    const userId = findUser === null || findUser === void 0 ? void 0 : findUser._id.toHexString();
    const jwtPayload = {
        userId,
        userRole: findUser === null || findUser === void 0 ? void 0 : findUser.userRole,
    };
    const token = (0, auth_util_1.createToken)(jwtPayload, config_1.default.jwt_secret, "5m");
    // const resetLink = `http://localhost:3000/ResetPassword/${token}`;
    const resetLink = `https://techwisdom.vercel.app/ResetPassword/${token}`;
    const sendMailResponse = yield (0, sendEmail_1.sendEmail)(resetLink, email);
    return sendMailResponse;
});
// ! for reseting password
const resetPasswordFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, password } = payload;
    // ! check if  user exist
    const user = yield user_model_1.userModel.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User dont exist !!! ");
    }
    if (user === null || user === void 0 ? void 0 : user.isDeleted) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "User is deleted !!");
    }
    yield user_model_1.userModel.findByIdAndUpdate(userId, {
        password
    }, { new: true });
    return null;
});
//
exports.authServices = {
    createUserIntoDB,
    signInFromDb,
    createAdminIntoDb,
    updateUser, resetMailLink, resetPasswordFromDb
};
