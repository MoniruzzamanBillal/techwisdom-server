import { model, Schema } from "mongoose";
import { TComment } from "./comment.interface";

const commentSchema = new Schema<TComment>(
  {
    content: { type: String, required: true },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

commentSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

commentSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const commentModel = model<TComment>("Comment", commentSchema);
