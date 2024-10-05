"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const SendImageCloudinary_1 = require("../../util/SendImageCloudinary");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const auth_validation_1 = require("./auth.validation");
const router = (0, express_1.Router)();
// ! for registering a user
router.post("/register", SendImageCloudinary_1.upload.single("file"), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(user_validation_1.userValidationSchemas.createUserValidationSchema), auth_controller_1.authController.createUser);
router.post("/signin", (0, validateRequest_1.default)(auth_validation_1.authValidations.loginValidationSchema), auth_controller_1.authController.signIn);
//
exports.authRouter = router;
