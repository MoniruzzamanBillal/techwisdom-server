import httpStatus from "http-status";
import AppError from "../../Error/AppError";

import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";
import { TPayment } from "./payment.interface";
import { initiatePayment, verifyPay } from "./payment.util";
import { paymentModel } from "./payment.model";
import { PAYMENTSTATUS } from "./payment.constant";
import { subscriptionsModel } from "../Subscriptions/subscriptions.model";

// ! for payment
const procedePayment = async (payload: TPayment) => {
  const trxnNumber = `TXN-${Date.now()}`;

  const { userId, amount } = payload;

  const userData = await userModel.findById(userId);

  if (!userData) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user dont exist !!");
  }

  if (userData?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "this user is deleted  !!");
  }

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
      { transactionId: transactionId },
      {
        paymentStatus: PAYMENTSTATUS.Completed,
      },
      { new: true }
    );
  }

  return verifyResult;
};

// ! get specific subscriber data
const getSubscriberDataFromDb = async (userId: string) => {
  const result = await subscriptionsModel.findOne({ userId: userId });

  return result;
};

// ! for getting all payment data
const getPaymentDataFromDb = async () => {
  const result = await paymentModel
    .find({
      paymentStatus: PAYMENTSTATUS.Completed,
    })
    .populate("userId");

  return result;
};

//
export const paymentServices = {
  procedePayment,
  verifyPayment,
  getSubscriberDataFromDb,
  getPaymentDataFromDb,
};
