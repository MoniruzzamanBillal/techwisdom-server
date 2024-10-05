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
exports.paymentServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const user_model_1 = require("../user/user.model");
const payment_util_1 = require("./payment.util");
const payment_model_1 = require("./payment.model");
const payment_constant_1 = require("./payment.constant");
// ! for payment
const procedePayment = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const trxnNumber = `TXN-${Date.now()}`;
    const { userId, amount } = payload;
    const userData = yield user_model_1.userModel.findById(userId);
    const { name, email } = userData;
    const paymentData = {
        userId: userId,
        amount,
        transactionId: trxnNumber,
        paymentStatus: payment_constant_1.PAYMENTSTATUS.Pending,
    };
    //   create payment data in database
    yield payment_model_1.paymentModel.create(paymentData);
    const USERID = userId.toString();
    const tracsactionData = {
        transactionId: trxnNumber,
        amount,
        customerName: name,
        customerEmail: email,
        userId: USERID,
    };
    const transactionResult = yield (0, payment_util_1.initiatePayment)(tracsactionData);
    if (transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, transactionResult === null || transactionResult === void 0 ? void 0 : transactionResult.tran_id);
    }
    return transactionResult;
});
// ! for verifying payment
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const verifyResult = yield (0, payment_util_1.verifyPay)(transactionId);
    if (verifyResult && (verifyResult === null || verifyResult === void 0 ? void 0 : verifyResult.pay_status) === "Successful") {
        yield payment_model_1.paymentModel.findOneAndUpdate({ trxnNumber: transactionId }, {
            payment: payment_constant_1.PAYMENTSTATUS.Completed,
        }, { new: true });
    }
    return verifyResult;
});
//
exports.paymentServices = {
    procedePayment,
    verifyPayment,
};
