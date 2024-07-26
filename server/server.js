import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import corsOption from "./config/cors.config.js";
import connectToDB from "./db/connect.db.js";
import credentials from "./middlewares/credentials.middleware.js";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT;

// Middleware
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json()); // To parse the incoming request with JSON payloads
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(port, () => {
  connectToDB();
  console.log("Aplikasi berjalan");
});
