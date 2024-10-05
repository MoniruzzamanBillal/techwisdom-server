import { Types } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  isDeleted: boolean;
  userRole: string;
  status: string;
  isVerified: boolean;
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
};

export type Tlogin = {
  email: string;
  password: string;
};

export type TUserRole = "admin" | "user";
