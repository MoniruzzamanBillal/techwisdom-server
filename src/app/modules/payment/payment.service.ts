import httpStatus from "http-status";
import AppError from "../../Error/AppError";

import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";
import { TPayment } from "./payment.interface";
import { initiatePayment, verifyPay } from "./payment.util";
import { paymentModel } from "./payment.model";
import { PAYMENTSTATUS } from "./payment.constant";
import { subscriptionsModel } from "../Subscriptions/subscriptions.model";
import { subDays } from "date-fns";

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

// ! for getting total payment revenue
const getPaymentRevenueFromDb = async () => {
  const result = await paymentModel
    .find({
      paymentStatus: { $eq: PAYMENTSTATUS.Completed },
    })
    .select(" amount ");

  const revenue = result?.reduce((acc, item) => {
    acc += item?.amount;
    return acc;
  }, 0);

  return revenue;
};

// ! for getting all subscribed user number
const getSubscribeduser = async () => {
  const response = await subscriptionsModel.find({
    status: { $eq: "Active" },
  });

  const result = response?.length;

  return result;
};

// ! for getting all user number
const getTotalUserNumber = async () => {
  const response = await userModel.find();

  const result = response?.length;

  return result;
};

// ! for getting all payment data for showing in chart
const getAllCompletedPaymentChartData = async (range: string) => {
  const today = new Date();
  let dateRange;

  if (range === "thirty") {
    dateRange = subDays(today, 30);
  } else if (range === "seven") {
    dateRange = subDays(today, 7);
  } else {
    dateRange = subDays(today, 60);
  }

  const paymentData = await paymentModel
    .find({
      paymentStatus: { $eq: PAYMENTSTATUS.Completed },
      updatedAt: { $gte: dateRange },
    })
    .select({
      updatedAt: 1,
      amount: 1,
    })
    .sort({ _id: -1 });

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, "-");
  };

  const modifiedData = paymentData?.map((item) => ({
    ...item.toObject(),
    updatedAt: formatDate(item.updatedAt!),
  }));

  // *  Define the type for accumulator
  type TAggregatedData = {
    [date: string]: { updatedAt: string; amount: number };
  };

  const aggregatedData = modifiedData.reduce((acc: TAggregatedData, item) => {
    const date = item.updatedAt;

    if (!acc[date]) {
      acc[date] = { updatedAt: date, amount: 0 };
    }

    acc[date].amount += item.amount;

    return acc;
  }, {});

  return Object.values(aggregatedData);
};

//
export const paymentServices = {
  procedePayment,
  verifyPayment,
  getSubscriberDataFromDb,
  getPaymentDataFromDb,
  getPaymentRevenueFromDb,
  getSubscribeduser,
  getAllCompletedPaymentChartData,
  getTotalUserNumber,
};
