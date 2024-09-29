import { model, Schema } from "mongoose";
import { PAYMENTSTATUS } from "./payment.constant";
import { TPayment } from "./payment.interface";

const paymentSchema = new Schema<TPayment>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const paymentModel = model<TPayment>("Payment", paymentSchema);
