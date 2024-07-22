import Conversation from "../models/conversation.model.js";
import User from "../models/user.model.js";

const getAllUsers = async (req, res) => {
  try {
    //Get all users, also the logged in user
    const users = await User.find().select("-password").exec();

    return res
      .status(200)
      .json({ status: 200, message: "Success to retrive users", data: users });
  } catch (error) {
    console.error("getAllUsers", error);

    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

const getUserWithChat = async (req, res) => {
  try {
    const loggedUserId = req.userId;

    // Find the conversation where the logged users have chated with
    const conversations = await Conversation.find({
      participants: { $in: [loggedUserId] },
    }).populate("participants");

    // Extract the participants from the conversations
    if (conversations.length) {
      const users = new Set();

      conversations.forEach((con) => {
        con.participants.forEach((user) => {
          if (user._id.toString() !== loggedUserId) {
            users.add(user);
          }
        });
      });

      // Change the set into array
      const userArr = Array.from(users);

      return res.status(200).json({
        status: 200,
        data: {
          users: userArr,
        },
      });
    }

    return res.status(200).json({
      status: 200,
      data: {
        users: [],
      },
    });
  } catch (error) {
    console.error("error history chat", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export { getAllUsers, getUserWithChat };
