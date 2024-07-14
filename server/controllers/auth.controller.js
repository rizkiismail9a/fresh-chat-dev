import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { generateTokenandCookie } from "../utils/generateToken.util.js";

const login = async (req, res) => {
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
    generateTokenandCookie(user._id, res);
    return res.status(200).json({
      status: 200,
      message: "Login success",
      data: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        userImage: user.profileImg,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
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
};

const signUp = async (req, res) => {
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
    const profileImg =
      process.env.AVATAR_PLACEHOLDER_API +
      `${gender === "male" ? "/boy" : "/girl"}`;

    const newUser = new User({
      fullName,
      gender,
      password: hashedPassword,
      username,
      profileImg,
    });

    await newUser.save();

    generateTokenandCookie(String(newUser._id), res);

    return res.status(201).json({
      message: "Sign Up Success",
      status: 201,
      user: {
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
};

const refreshToken = async (req, res) => {
  try {
    const { _id } = req.body; // The id of logged in user
    console.log(req);

    if (!_id)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid payload data" });

    generateTokenandCookie(_id, res);

    return res.status(200).json({ status: 200, message: "Login success" });
  } catch (error) {
    console.error("error refresh token", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { login, logout, refreshToken, signUp };
