import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { authServices } from "./auth.service";

//  !  create user
const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body, req.file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully ",
    data: result,
  });
});

//  !  create admin user
const createAdminUser = catchAsync(async (req, res) => {
  const result = await authServices.createAdminIntoDb(req.body, req.file);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin registered successfully ",
    data: result,
  });
});

//  !  create admin user
const updateUser = catchAsync(async (req, res) => {
  const result = await authServices.updateUser(
    req.body,
    req?.params?.id,
    req.file
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User  updated successfully ",
    data: result,
  });
});

// ! signin
const signIn = catchAsync(async (req, res) => {
  const result = await authServices.signInFromDb(req.body);

  const { token, user } = result;

  const modifiedToken = `Bearer ${token}`;

  res.cookie("token", modifiedToken, {
    secure: false,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiedUser = user.toObject() as any;
  delete modifiedUser.password;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully ",
    data: modifiedUser,
    token: token,
  });
});


// !send reset link to mail
const sendResetLink = catchAsync(async (req, res) => {
  const result = await authServices.resetMailLink(req?.params?.email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Reset email sent successfully  ",
    data: result,
  });
});

// ! for reseting password 
const resetPassWord = catchAsync(async (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const result = await authServices.resetPasswordFromDb(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password reset successfully  ",
    data: { message: "success" },
  });
});




//
export const authController = {
  createUser,
  signIn,
  createAdminUser,
  updateUser,sendResetLink ,resetPassWord
};
