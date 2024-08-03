const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
