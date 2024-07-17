import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1] ?? "";
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Hati-hati, ada kemungkinan token yang kadaluwarsa juga bakal true
    if (!decoded._id)
      return res.status(401).json({ message: "Invalid payload data" });

    req.userId = decoded._id;

    next();
  } catch (err) {
    console.error(err);

    return res.status(400).json({ status: 400, message: "Invalid token." });
  }
};
