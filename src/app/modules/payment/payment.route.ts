import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

// ! get payment data
router.get("/payment-data", paymentController.getAllPaymentData);

// ! get  payment revenue data
router.get("/payment-revenue", paymentController.getAllPaymentRevenueData);

// ! get  all subscriber user number
router.get("/subscriber-number", paymentController.getAllSubscribedUser);

// ! get  all  user number
router.get("/user-number", paymentController.getAllUserNumber);

// ! get getting all payment data for chart
router.get("/payment-chart", paymentController.getAllPaymentChartData);

// ! for payment
router.post("/procede-payment", paymentController.procedePayment);

// ! verifying payment
router.post("/confirmation", paymentController.verifyPayment);
// ! cancel payment
router.post("/cancel-payment", paymentController.cancelPayment);

// ! get specific subscriber data
router.get("/get-subscriber/:id", paymentController.getSubscriberData);

//
export const paymentRouter = router;
