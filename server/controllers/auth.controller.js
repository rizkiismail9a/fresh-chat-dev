const bcrypt = require("bcrypt");
const User = require("../models/user.model.js");
const generateTokenandCookie = require("../utils/generateToken.util.js");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ status: 400, message: "Username or password are required" });

    // Check user availability
    const user = await User.findOne({ username }).exec();
    if (!user)
      return res.status(404).json({ status: 404, message: "User not found" });

    // Check password correctivity
    const isPassCorrect = await bcrypt.compare(password, user?.password);
    if (!isPassCorrect)
      return res
        .status(403)
        .json({ status: 403, message: "Incorrect password or username" });

    // If username and password valid, generate new token
    const token = generateTokenandCookie(user._id.toString(), res);

    return res.status(200).json({
      status: 200,
      message: "Login success",
      data: {
        token,
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profileImg: user.profileImg,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    return res.status(200).json({ status: 200, message: "Logout success" });
  } catch (error) {
    console.error("logout error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function signUp(req, res) {
  try {
    const { password, confirmPass, fullName, username, gender } = req.body;
    if (!password || !confirmPass || !fullName || !username || !gender)
      return res
        .status(400)
        .json({ message: "Please fill all required data", status: 400 });

    // Check if the password is the same with confirmation password
    if (password !== confirmPass) {
      return res.status(400).json({
        message: "Confirmation password does not match",
      });
    }

    // Check if the username is already used
    const user = await User.findOne({ username }).exec();
    if (user) {
      return res
        .status(400)
        .json({ message: "username is already exist", status: 400 });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10); //The higher it is, the safer and slower
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a placeholder for the avatar
    const profileImg = `${gender === "male" ? "/boy.webp" : "/girl.webp"}`;

    const newUser = new User({
      fullName,
      gender,
      password: hashedPassword,
      username,
      profileImg,
    });

    await newUser.save();

    const token = generateTokenandCookie(newUser._id.toString(), res);

    return res.status(201).json({
      message: "Sign Up Success",
      status: 201,
      data: {
        token,
        _id: newUser._id,
        fullName,
        gender,
        username,
        profileImg,
      },
    });
  } catch (error) {
    console.error("signup error", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function refreshToken(req, res) {
  try {
    const { _id } = req.body; // The id of logged in user

    if (!_id)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid payload data" });

    const token = generateTokenandCookie(_id, res);

    return res
      .status(200)
      .json({ status: 200, message: "Login success", token });
  } catch (error) {
    console.error("error refresh token", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword, confirmNewPassword, userId } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword || !userId)
      return res
        .status(400)
        .json({ status: 400, message: "Fill all required data" });

    const user = await User.findById(userId).exec();

    const isOldPassCorrect = await bcrypt.compare(oldPassword, user.password);

    if (!isOldPassCorrect)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid old password" });

    if (newPassword !== confirmNewPassword)
      return res
        .status(400)
        .json({ status: 400, message: "Confirm password does not match" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    await user.save();

    return res
      .status(201)
      .json({ status: 201, message: "Password is successfully updated" });
  } catch (error) {
    console.error("error change password", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
}

module.exports = { login, logout, refreshToken, signUp, changePassword };
