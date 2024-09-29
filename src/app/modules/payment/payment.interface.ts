import { ObjectId } from "mongoose";

export type TPayment = {
  userId: ObjectId;
  amount: number;
  paymentStatus: "Completed" | "Pending" | "Failed";
  transactionId: string;
  createdAt?: Date;
  updatedAt?: Date;
};
