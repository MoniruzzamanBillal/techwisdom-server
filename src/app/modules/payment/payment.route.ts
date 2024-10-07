import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

// ! for payment
router.post(
  "/procede-payment",

  paymentController.procedePayment
);

// ! verifying payment
router.post("/confirmation", paymentController.verifyPayment);
// ! cancel payment
router.post("/cancel-payment", paymentController.cancelPayment);

//
export const paymentRouter = router;
