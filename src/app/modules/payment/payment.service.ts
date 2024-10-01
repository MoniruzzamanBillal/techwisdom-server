import httpStatus from "http-status";
import AppError from "../../Error/AppError";

import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";
import { TPayment } from "./payment.interface";
import { initiatePayment, verifyPay } from "./payment.util";
import { paymentModel } from "./payment.model";
import { PAYMENTSTATUS } from "./payment.constant";

// ! for payment
const procedePayment = async (payload: TPayment) => {
  const trxnNumber = `TXN-${Date.now()}`;

  const { userId, amount } = payload;

  const userData = await userModel.findById(userId);

  const { name, email } = userData as TUser;

  const paymentData = {
    userId: userId,
    amount,
    transactionId: trxnNumber,
    paymentStatus: PAYMENTSTATUS.Pending,
  };

  //   create payment data in database
  await paymentModel.create(paymentData);

  const USERID = userId.toString();

  const tracsactionData = {
    transactionId: trxnNumber,
    amount,
    customerName: name,
    customerEmail: email,
    userId: USERID,
  };

  const transactionResult = await initiatePayment(tracsactionData);

  if (transactionResult?.tran_id) {
    throw new AppError(httpStatus.BAD_REQUEST, transactionResult?.tran_id);
  }

  return transactionResult;
};

// ! for verifying payment
const verifyPayment = async (transactionId: string) => {
  const verifyResult = await verifyPay(transactionId);

  if (verifyResult && verifyResult?.pay_status === "Successful") {
    await paymentModel.findOneAndUpdate(
      { trxnNumber: transactionId },
      {
        payment: PAYMENTSTATUS.Completed,
      },
      { new: true }
    );
  }

  return verifyResult;
};

//
export const paymentServices = {
  procedePayment,
  verifyPayment,
};
