import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId, // This field contain mongoDB id
      ref: "User", // The reference of the senderId is id from user collection
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId, // This field contain mongoDB id
      ref: "User", // The reference of the senderId is id from user collection
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
