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
// ! for getting single user
const getSingleUser = catchAsync(async (req, res) => {
  const result = await userServices.getSingleUserFromDb(req.params.id);

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

// ! for blocking a user
const blockUser = catchAsync(async (req, res) => {
  const result = await userServices.blockUserFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User blocked successfully!!!",
    data: result,
  });
});

// ! for unblocking a user
const unblockUser = catchAsync(async (req, res) => {
  const result = await userServices.unblockUserFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User unblocked successfully!!!",
    data: result,
  });
});

// ! for unblocking a user
const deleteUser = catchAsync(async (req, res) => {
  const result = await userServices.deleteUserFromDb(req.params.id);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User deleted successfully!!!",
    data: result,
  });
});

// ! for getting all admin user
const getAllAdminUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllAdminUsersFromDb();

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "All Admin Users retrived successfully!!!",
    data: result,
  });
});

//
export const userController = {
  followUser,
  UnfollowUser,
  getSpecificUser,
  getAllUsers,
  blockUser,
  unblockUser,
  deleteUser,
  getAllAdminUsers,
  getSingleUser,
};
