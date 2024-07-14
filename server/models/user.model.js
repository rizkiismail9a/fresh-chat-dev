import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    profileImg: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: {
      createdAt: "createdAd",
      updatedAt: "updatedAt",
    },
  }
);

const User = mongoose.model("User", userSchema);

export default User;
