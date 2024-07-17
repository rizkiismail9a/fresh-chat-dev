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

export { getAllUsers };
