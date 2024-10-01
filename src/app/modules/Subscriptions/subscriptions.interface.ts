import { ObjectId } from "mongoose";

export interface TSubscription {
  userId: ObjectId;
  status: "Active" | "Cancelled";
  startDate: string;
  endDate: string;
  createdAt?: Date;
  updatedAt?: Date;
}
