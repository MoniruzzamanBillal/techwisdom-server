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
exports.paymentController = void 0;
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const subscriptions_model_1 = require("../Subscriptions/subscriptions.model");
const user_model_1 = require("../user/user.model");
const payment_service_1 = require("./payment.service");
const redirectURL = "http://localhost:3000";
// ! for payment
const procedePayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.procedePayment(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Proceding Payment !!!!!",
        data: result,
    });
}));
// ! for verify payment
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { transactionId, userId } = req.query;
    const result = yield payment_service_1.paymentServices.verifyPayment(transactionId);
    if (!result) {
        throw new Error("Payment unsuccessful");
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);
    const subscriptionData = {
        status: "Active",
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
    };
    const existingSubscription = yield subscriptions_model_1.subscriptionsModel.findOne({ userId });
    if (existingSubscription) {
        yield subscriptions_model_1.subscriptionsModel.updateOne({ userId }, { subscriptionData }, { new: true });
    }
    else {
        yield subscriptions_model_1.subscriptionsModel.create(Object.assign({ userId }, subscriptionData));
    }
    yield user_model_1.userModel.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
    if (result) {
        return res.redirect(`${redirectURL}/payment-confirm/${userId}`);
    }
    else {
        throw new Error("Payment unsuccessfull");
    }
}));
// ! for cancel payment
const cancelPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.redirect(`${redirectURL}/dashboard/user/user-payment?paymentConfirmation=Failed`);
}));
// ! get subscriber data
const getSubscriberData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield payment_service_1.paymentServices.getSubscriberDataFromDb((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Subscriber retrived successfully !!!",
        data: result,
    });
}));
// ! get all payment data
const getAllPaymentData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.getPaymentDataFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "payment data retrived successfully !!!",
        data: result,
    });
}));
// ! get getting payment revenue  data
const getAllPaymentRevenueData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.getPaymentRevenueFromDb();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "payment revenue data retrived successfully !!!",
        data: result,
    });
}));
// ! get getting all subscribed number
const getAllSubscribedUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.getSubscribeduser();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Subscribed user retribed successfully ",
        data: result,
    });
}));
// ! get getting all user number
const getAllUserNumber = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_service_1.paymentServices.getTotalUserNumber();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: " user retribed successfully ",
        data: result,
    });
}));
// ! for getting all payment data for chart data
const getAllPaymentChartData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { range } = req.query;
    const result = yield payment_service_1.paymentServices.getAllCompletedPaymentChartData(range);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Completed Payment Bookings retrieved successfully",
        data: result,
    });
}));
//
//
exports.paymentController = {
    procedePayment,
    verifyPayment,
    cancelPayment,
    getSubscriberData,
    getAllPaymentData,
    getAllPaymentRevenueData,
    getAllSubscribedUser,
    getAllPaymentChartData,
    getAllUserNumber,
};
