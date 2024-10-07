import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { userServices } from "./user.service";

// ! for following user
const followUser = catchAsync(async (req, res) => {
  const result = await userServices.followUserFromDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User followed successfully!!!",
    data: result,
  });
});

// ! for unfollowing user
const UnfollowUser = catchAsync(async (req, res) => {
  const result = await userServices.unfollowUserFromDb(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User unfollowed successfully!!!",
    data: result,
  });
});

// ! for getting specific user
const getSpecificUser = catchAsync(async (req, res) => {
  const result = await userServices.getSpecificUserFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User retrived successfully!!!",
    data: result,
  });
});

// ! for unfollowing user
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDb();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All Users retrived successfully!!!",
    data: result,
  });
});

//
export const userController = {
  followUser,
  UnfollowUser,
  getSpecificUser,
  getAllUsers,
};
