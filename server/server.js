const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const connectToDB = require("./db/connect.db.js");
const corsOption = require("./config/cors.config.js");
const credentials = require("./middlewares/credentials.middleware.js");
const { authRoutes, messageRoutes, userRoutes } = require("./routes/index.js");

const { app, server } = require("./socket/socket.js");

const port = process.env.PORT;

// Middleware
app.use(credentials);
app.use(cors(corsOption));
app.use(express.json()); // To parse the incoming request with JSON payloads
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

connectToDB().then(() => {
  server.listen(port, () => {
    console.log(`Aplikasi berjalan pada ${port}`);
  });
});
