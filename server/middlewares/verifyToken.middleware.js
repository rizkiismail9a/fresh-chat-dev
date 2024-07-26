import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hati-hati, ada kemungkinan token yang kadaluwarsa juga bakal true
    if (!decoded._id)
      return res.status(401).json({ message: "Invalid payload data" });

    req.userId = decoded._id;

    next();
  } catch (err) {
    console.error(err);

    return res
      .status(401)
      .json({ status: 401, message: "Token invalid or has been expired." });
  }
};
