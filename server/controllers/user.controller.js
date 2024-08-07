const Conversation = require("../models/conversation.model.js");
const User = require("../models/user.model.js");

async function getAllUsers(req, res) {
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
}

async function getUserWithChat(req, res) {
  try {
    const loggedUserId = req.userId;
    const search = req.query.search;

    const conversations = await Conversation.find({
      participants: { $in: [loggedUserId] },
    }).populate("participants");

    if (search) {
      const users = await User.find({
        fullName: { $regex: new RegExp(search, "i") },
      });

      const userArr = Array.from(users);

      return res.status(200).json({
        status: 200,
        data: {
          users: userArr,
        },
      });
    }

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
}

module.exports = { getAllUsers, getUserWithChat };
