/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../Error/AppError";
import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { Tlogin, TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";
import { createToken } from "./auth.util";
import config from "../../config";
import { sendEmail } from "../../util/sendEmail";

// ! create user in database

const createUserIntoDB = async (payload: Partial<TUser>, file: any) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.create({
    ...payload,
    profilePicture: userImg,
  });

  return result;
};

// ! create admin
const createAdminIntoDb = async (payload: Partial<TUser>, file: any) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.create({
    ...payload,
    profilePicture: userImg,
  });

  return result;
};

// ! update admin
const updateUser = async (
  payload: Partial<TUser>,
  userId: string,
  file: any
) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.findByIdAndUpdate(
    userId,
    { ...payload, profilePicture: userImg },
    { new: true }
  );

  return result;
};

// ! sign in
const signInFromDb = async (payload: Tlogin) => {
  const user = await userModel
    .findOne({ email: payload?.email })
    .populate("followers")
    .populate("following");

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User dont exist with this email !!!"
    );
  }

  // console.log(payload?.password);
  // console.log(user?.password);

  // const isPasswordMatch = await bcrypt.compare(
  //   payload?.password,
  //   user?.password
  // );

  // console.log(isPasswordMatch);


  

  if ( payload?.password !== user?.password ) {
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


// ! send mail for reseting password
const resetMailLink = async (email: string) => {

  const findUser = await userModel
    .findOne({ email })
    .select(" name email role  ");

   

  if (!findUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "User don't exist !!");
  }

  if (findUser?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
  }

  const userId = findUser?._id.toHexString();

  const jwtPayload = {
    userId,
    userRole: findUser?.userRole,
  };

  const token = createToken(jwtPayload, config.jwt_secret as string, "5m");

 

  // const resetLink = `https://rent-ride-ivory.vercel.app/reset-password/${token}`;
  const resetLink = `http://localhost:3000/ResetPassword/${token}`;

  const sendMailResponse = await sendEmail(resetLink, email);



  return sendMailResponse;
};





// ! for reseting password
const resetPasswordFromDb = async (payload: {
  userId: string;
  password: string;
}) => {
  const { userId, password } = payload;

  // ! check if  user exist
  const user = await userModel.findById(userId);

  if (!user) {
    throw new AppError(httpStatus.BAD_REQUEST, "User dont exist !!! ");
  }

  if (user?.isDeleted) {
    throw new AppError(httpStatus.BAD_REQUEST, "User is deleted !!");
  }

  
  await userModel.findByIdAndUpdate(
    userId,
    {
      password
    },
    { new: true }
  );

  return null;
};




//

export const authServices = {
  createUserIntoDB,
  signInFromDb,
  createAdminIntoDb,
  updateUser,resetMailLink ,resetPasswordFromDb
};
