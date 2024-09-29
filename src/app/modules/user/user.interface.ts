import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isDeleted: boolean;
  userRole: string;
  isVerified: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
};
