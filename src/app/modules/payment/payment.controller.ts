import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { subscriptionsModel } from "../Subscriptions/subscriptions.model";
import { userModel } from "../user/user.model";
import { paymentServices } from "./payment.service";

const redirectURL = "http://localhost:3000";

// ! for payment
const procedePayment = catchAsync(async (req, res) => {
  const result = await paymentServices.procedePayment(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Proceding Payment !!!!!",
    data: result,
  });
});

// ! for verify payment
const verifyPayment = catchAsync(async (req, res) => {
  const { transactionId, userId } = req.query;

  const result = await paymentServices.verifyPayment(transactionId as string);

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

  const existingSubscription = await subscriptionsModel.findOne({ userId });

  if (existingSubscription) {
    await subscriptionsModel.updateOne(
      { userId },
      { subscriptionData },
      { new: true }
    );
  } else {
    await subscriptionsModel.create({ userId, ...subscriptionData });
  }

  await userModel.findByIdAndUpdate(
    userId,
    { isVerified: true },
    { new: true }
  );

  if (result) {
    return res.redirect(`${redirectURL}/payment-confirm/${userId}`);
  } else {
    throw new Error("Payment unsuccessfull");
  }
});

// ! for cancel payment

const cancelPayment = catchAsync(async (req, res) => {
  return res.redirect(
    `${redirectURL}/dashboard/user/user-payment?paymentConfirmation=Failed`
  );
});

// ! get subscriber data
const getSubscriberData = catchAsync(async (req, res) => {
  const result = await paymentServices.getSubscriberDataFromDb(req?.params?.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Subscriber retrived successfully !!!",
    data: result,
  });
});

// ! get all payment data
const getAllPaymentData = catchAsync(async (req, res) => {
  const result = await paymentServices.getPaymentDataFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment data retrived successfully !!!",
    data: result,
  });
});

// ! get getting payment revenue  data
const getAllPaymentRevenueData = catchAsync(async (req, res) => {
  const result = await paymentServices.getPaymentRevenueFromDb();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "payment revenue data retrived successfully !!!",
    data: result,
  });
});

//
export const paymentController = {
  procedePayment,
  verifyPayment,
  cancelPayment,
  getSubscriberData,
  getAllPaymentData,
  getAllPaymentRevenueData,
};
