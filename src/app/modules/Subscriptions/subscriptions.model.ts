import { model, Schema } from "mongoose";
import { TSubscription } from "./subscriptions.interface";

const subscriptionsSchema = new Schema<TSubscription>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const subscriptionsModel = model<TSubscription>(
  "Subscriptions",
  subscriptionsSchema
);
