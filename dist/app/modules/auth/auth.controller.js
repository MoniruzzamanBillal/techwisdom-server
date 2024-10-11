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
exports.authController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const auth_service_1 = require("./auth.service");
//  !  create user
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.createUserIntoDB(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully ",
        data: result,
    });
}));
//  !  create admin user
const createAdminUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.createAdminIntoDb(req.body, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Admin registered successfully ",
        data: result,
    });
}));
//  !  create admin user
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield auth_service_1.authServices.updateUser(req.body, (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id, req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "User  updated successfully ",
        data: result,
    });
}));
// ! signin
const signIn = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_service_1.authServices.signInFromDb(req.body);
    const { token, user } = result;
    const modifiedToken = `Bearer ${token}`;
    res.cookie("token", modifiedToken, {
        secure: false,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const modifiedUser = user.toObject();
    delete modifiedUser.password;
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "User logged in successfully ",
        data: modifiedUser,
        token: token,
    });
}));
// !send reset link to mail
const sendResetLink = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const result = yield auth_service_1.authServices.resetMailLink((_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Reset email sent successfully  ",
        data: result,
    });
}));
// ! for reseting password 
const resetPassWord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = yield auth_service_1.authServices.resetPasswordFromDb(req === null || req === void 0 ? void 0 : req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Password reset successfully  ",
        data: { message: "success" },
    });
}));
//
exports.authController = {
    createUser,
    signIn,
    createAdminUser,
    updateUser, sendResetLink, resetPassWord
};
