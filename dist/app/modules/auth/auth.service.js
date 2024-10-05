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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_util_1 = require("./auth.util");
const config_1 = __importDefault(require("../../config"));
// ! create user in database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const name = payload === null || payload === void 0 ? void 0 : payload.name;
    const path = file === null || file === void 0 ? void 0 : file.path;
    const userImgresult = yield (0, SendImageCloudinary_1.SendImageCloudinary)(path, name);
    const userImg = userImgresult === null || userImgresult === void 0 ? void 0 : userImgresult.secure_url;
    const result = yield user_model_1.userModel.create(Object.assign(Object.assign({}, payload), { profilePicture: userImg }));
    return result;
});
// ! sign in
const signInFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User dont exist with this email !!!");
    }
    const isPasswordMatch = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordMatch) {
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
//
exports.authServices = {
    createUserIntoDB,
    signInFromDb,
};
