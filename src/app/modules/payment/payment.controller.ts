import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { subscriptionsModel } from "../Subscriptions/subscriptions.model";
import { paymentServices } from "./payment.service";

const redirectURL = "http://localhost:5173";

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

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  const subscriptionData = {
    userId: userId,
    status: "Active",
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  };

  await subscriptionsModel.create(subscriptionData);

  if (result) {
    return res.redirect(`${redirectURL}`);
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

//
export const paymentController = {
  procedePayment,
  verifyPayment,
  cancelPayment,
};
