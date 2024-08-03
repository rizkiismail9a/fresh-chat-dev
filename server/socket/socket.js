const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"], // Port client
    methods: ["GET", "POST"],
  },
});

const socketOptions = {};

// Listen to the events emitted from the Server object
socket.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") socketOptions[userId] = socket.id;

  /*
   * After assigning the socket.id to the key of userId,
   * send it to every connected user with emit
   */

  socket.emit("getOnlineStatus", Object.keys(socketOptions));

  socket.on("disconnect", () => {
    delete socketOptions[userId];
    socket.emit("getOnlineStatus", Object.keys(socketOptions));
  });
});

module.exports = { app, server, socket, socketOptions };
