import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import corsOption from "./config/cors.config.js";
import credentials from "./middlewares/credentials.middleware.js";
import { authRoutes, messageRoutes, userRoutes } from "./routes/index.js";
import { app, server } from "./socket/socket.js";

dotenv.config();

const port = process.env.PORT;
const __dirname = path.resolve();

// Middleware
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json()); // To parse the incoming request with JSON payloads
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

connectToDB().then(() => {
  server.listen(port, () => {
    console.log("Aplikasi berjalan");
  });
});
