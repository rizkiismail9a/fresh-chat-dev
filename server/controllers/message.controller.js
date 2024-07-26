import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { socket } from "../socket/socket.js";
import { getSocketId } from "../utils/getSocketId.util.js";

const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // This is reciever id
    const { userId: senderId } = req;

    let conversation;

    /*
     * If the user the message to themselves
     *
     */

    if (receiverId === senderId) {
      conversation = await Conversation.findOne({
        participants: { $all: [receiverId], $size: 1 },
      });
    } else {
      // Find the conversation where the participants are all of them
      conversation = await Conversation.findOne({
        participants: { $all: [receiverId, senderId] },
      });
    }

    // If the conversation is not available, create new one
    if (!conversation) {
      conversation = await Conversation.create({
        participants:
          receiverId === senderId ? [receiverId] : [receiverId, senderId],
      });
    }

    // Now, create the message
    const newMessage = new Message({
      receiverId,
      senderId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage);

    await Promise.all([conversation.save(), newMessage.save()]);

    const recieverSokcetId = getSocketId(receiverId);

    if (recieverSokcetId) {
      socket
        .to(recieverSokcetId)
        .emit("newMessage", { status: 201, data: newMessage, senderId });
    }

    return res.status(201).json({ status: 201, data: newMessage });
  } catch (error) {
    console.error("error send message", error);

    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { userId: senderId } = req;

    /*
     * Get the conversation and the messages
     * the populate syntax will return all the messages, instead of just the ids
     * since we have ref in the model
     *
     */

    const conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId] },
    }).populate("messages");

    if (!conversation)
      return res.status(200).json({
        status: 200,
        message: "Succeed to get conversation",
        data: [],
      });

    return res.status(200).json({
      status: 200,
      message: "Succeed to get conversation",
      data: conversation,
    });
  } catch (error) {
    console.error("error get conversation", error);

    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
export { getConversation, sendMessage };
