import dotenv from "dotenv";
import express from "express";

import connectToDB from "./db/connect.db.js";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json()); // To parse the incoming request with JSON payloads
// app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  connectToDB();
  console.log("Aplikasi berjalan");
});
