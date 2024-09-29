import { ObjectId } from "mongoose";

export interface TSubscription {
  userId: ObjectId;
  plan: "Monthly" | "Yearly";
  status: "Active" | "Cancelled";
  startDate: string;
  endDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
