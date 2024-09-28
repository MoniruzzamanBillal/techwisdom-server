import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user?.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

userSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});
userSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });

  next();
});

export const userModel = model<TUser>("User", userSchema);
