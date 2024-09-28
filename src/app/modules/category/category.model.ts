import { model, Schema } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>(
  {
    cName: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

categorySchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
categorySchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const categoryModel = model<TCategory>("Category", categorySchema);
