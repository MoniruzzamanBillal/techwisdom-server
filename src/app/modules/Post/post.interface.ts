import { ObjectId } from "mongoose";

export type TPost = {
  title: string;
  content: string;
  authorId: ObjectId;
  category: ObjectId;
  comments: ObjectId[];
  upvotedBy: ObjectId[];
  downvotedBy: ObjectId[];
  isPremium: boolean;
  isDeleted?: boolean;
  upvotes?: number;
  downvotes?: number;
  postImg?: string;
};
