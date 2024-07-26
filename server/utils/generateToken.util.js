import jwt from "jsonwebtoken";

export const generateTokenandCookie = (userId, res) => {
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    maxAge: 60 * 60 * 24 * 1000, // One day only
    httpOnly: true, // Prevent the cookie to be accessed by Javascript (XSS)
    sameSite: "strict", //Prevent the CSRF (cross-site request forgery) attack
    secure: process.env.DEV_ENV !== "development",
  });

  return token;
};
