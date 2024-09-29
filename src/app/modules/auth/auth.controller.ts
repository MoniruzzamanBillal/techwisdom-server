import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { authServices } from "./auth.service";

//  !  create user
const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDB(req.body, req.file);

  sendResponse(res, {
    status: 201,
    success: true,
    message: "User registered successfully ",
    data: result,
  });
});

//
export const authController = {
  createUser,
};
