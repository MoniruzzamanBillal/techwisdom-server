"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
// ! get payment data
router.get("/payment-data", payment_controller_1.paymentController.getAllPaymentData);
// ! for payment
router.post("/procede-payment", payment_controller_1.paymentController.procedePayment);
// ! verifying payment
router.post("/confirmation", payment_controller_1.paymentController.verifyPayment);
// ! cancel payment
router.post("/cancel-payment", payment_controller_1.paymentController.cancelPayment);
// ! get specific subscriber data
router.get("/get-subscriber/:id", payment_controller_1.paymentController.getSubscriberData);
//
exports.paymentRouter = router;
