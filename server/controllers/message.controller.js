const Conversation = require("../models/conversation.model.js");
const Message = require("../models/message.model.js");
const User = require("../models/user.model.js");
const { socket } = require("../socket/socket.js");
const getSocketId = require("../utils/getSocketId.util.js");

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // This is reciever id
    const { userId: senderId } = req;
    const recieverSokcetId = getSocketId(receiverId);

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

    // If the conversation is not available, create new one and tell the reciever
    if (!conversation) {
      const sender = await User.findById(senderId);
      conversation = await Conversation.create({
        participants:
          receiverId === senderId ? [receiverId] : [receiverId, senderId],
      });
      socket
        .to(recieverSokcetId)
        .emit("newConversation", { status: 200, data: { users: sender } });
    }

    // Now, create the message
    const newMessage = new Message({
      receiverId,
      senderId,
      message,
    });

    if (newMessage) conversation.messages.push(newMessage);

    await Promise.all([conversation.save(), newMessage.save()]);

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
}

async function getConversation(req, res) {
  try {
    const { id: receiverId } = req.params;
    const { limit, page } = req.query;
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

    const startIndex = (Number(page) - 1) * Number(limit);
    const endIndex = Number(page) * Number(limit);
    // const totalMessages = conversation.messages.length;

    const slicedMessages = Array.from(conversation.messages)
      .reverse()
      .slice(startIndex, endIndex)
      .reverse();

    return res.status(200).json({
      status: 200,
      message: "Succeed to get conversation",
      data: {
        participants: conversation.participants,
        messages: slicedMessages,
        createdAt: conversation.createdAt,
        updatedAt: conversation.updatedAt,
        _id: conversation._id,
        totalMessages: slicedMessages.length,
      },
    });
  } catch (error) {
    console.error("error get conversation", error);

    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}
module.exports = { getConversation, sendMessage };
