import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { Tlogin, TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";
import bcrypt from "bcrypt";
import { createToken } from "./auth.util";
import config from "../../config";

// ! create user in database
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUserIntoDB = async (payload: Partial<TUser>, file: any) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.create({ ...payload, userImg });

  return result;
};

// ! sign in
const signInFromDb = async (payload: Tlogin) => {
  const user = await userModel.findOne({ email: payload?.email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User dont exist with this email !!!"
    );
  }

  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, "Password don't match !!");
  }

  const userId = user?._id.toHexString();
  const userRole = user?.userRole;

  const jwtPayload = {
    userId,
    userRole,
  };

  const token = createToken(jwtPayload, config.jwt_secret as string, "10d");

  return {
    user,
    token,
  };

  //
};

//

export const authServices = {
  createUserIntoDB,
  signInFromDb,
};
