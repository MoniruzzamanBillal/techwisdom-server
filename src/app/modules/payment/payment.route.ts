import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

// ! get payment data
router.get("/payment-data", paymentController.getAllPaymentData);

// ! for payment
router.post(
  "/procede-payment",

  paymentController.procedePayment
);

// ! verifying payment
router.post("/confirmation", paymentController.verifyPayment);
// ! cancel payment
router.post("/cancel-payment", paymentController.cancelPayment);

// ! get specific subscriber data
router.get("/get-subscriber/:id", paymentController.getSubscriberData);

//
export const paymentRouter = router;
