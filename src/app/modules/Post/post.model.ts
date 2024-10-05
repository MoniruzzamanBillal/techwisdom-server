import { model, Schema } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    isPremium: {
      type: Boolean,
      require: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },
    postImg: {
      type: String,
    },
  },
  { timestamps: true }
);

postSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
postSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const postModel = model<TPost>("Post", postSchema);
