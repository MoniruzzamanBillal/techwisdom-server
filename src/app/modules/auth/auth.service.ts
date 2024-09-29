import { SendImageCloudinary } from "../../util/SendImageCloudinary";
import { TUser } from "../user/user.interface";
import { userModel } from "../user/user.model";

// ! create user in database
const createUserIntoDB = async (payload: Partial<TUser>, file: any) => {
  const name = payload?.name;
  const path = file?.path;

  const userImgresult = await SendImageCloudinary(path, name as string);

  const userImg = userImgresult?.secure_url;

  const result = await userModel.create({ ...payload, userImg });

  return result;
};

//

export const authServices = {
  createUserIntoDB,
};
