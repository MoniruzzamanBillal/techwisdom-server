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
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../Error/AppError"));
const catchAsync_1 = __importDefault(require("../util/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const header = req.headers.authorization;
        if (!header) {
            throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Authorization header missing or malformed");
        }
        const token = header === null || header === void 0 ? void 0 : header.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
        const { userRole } = decoded;
        if (requiredRoles && !requiredRoles.includes(userRole)) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "You have no access to this route",
            });
        }
        req.user = decoded;
        next();
        //
    }));
};
exports.default = auth;
