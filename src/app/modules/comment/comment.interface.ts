import { ObjectId } from "mongoose";

export type TComment = {
  content: string;
  postId: ObjectId;
  userId: ObjectId;
  isDeleted?: boolean;
};
