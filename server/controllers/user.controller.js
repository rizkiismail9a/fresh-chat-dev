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

    /*
     * lean is a javascript method, that makes the object mongoose lighter
     */
    const conversations = await Conversation.find({
      participants: { $in: [loggedUserId] },
    })
      .lean()
      .populate("participants", "_id fullName username gender profileImg");

    if (search) {
      const users = await User.find({
        fullName: { $regex: new RegExp(search, "i") },
      })
        .lean()
        .exec();

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
            users.add({
              ...user,
              isRead: con.isRead,
              lastSender: con.lastSender,
            });
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

async function editUser(req, res) {
  try {
    const { username, fullName, userId, gender } = req.body;
    if (!userId)
      return res
        .status(400)
        .json({ status: 400, message: "user id is required" });

    const user = await User.findById(userId).exec();

    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    // Check if the username is already used by other people
    if (username) {
      const foundUsers = await User.findOne({ username }).exec();

      // Convert the foundUsers id to string first, since it is objectId at first
      if (!!foundUsers && foundUsers._id.toString() !== userId) {
        return res
          .status(400)
          .json({ status: 400, message: "Username is already used" });
      }
      user.username = username;
    }

    if (gender) {
      user.gender = gender;
    }

    if (fullName) {
      user.fullName = fullName;
    }

    await user.save();

    return res.status(201).json({
      status: 201,
      message: "Profile is successfully updated",
      data: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profileImg: user.profileImg,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("error editUser", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}

module.exports = { getAllUsers, getUserWithChat, editUser };
