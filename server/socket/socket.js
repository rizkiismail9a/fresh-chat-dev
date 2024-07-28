import express from "express";
import http from "http";
import { Server } from "socket.io";
// import socketOptions from "../options/socket.options.js";

const app = express();
const server = http.createServer(app);
const socket = new Server(server, {
  cors: {
    origin: ["http://localhost:5000"], //Port client
    methods: ["GET", "POST"],
  },
});

export const socketOptions = {};

// Listen the event those has been emitted from the object Server
socket.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") socketOptions[userId] = socket.id;

  /*
   * After assign the socket.id to the key of userId,
   * send it to every connected user with emit
   *
   */

  socket.emit("getOnlineStatus", Object.keys(socketOptions));

  socket.on("disconnect", () => {
    console.log("user terlepas", socket.id);
    delete socketOptions[userId];
    socket.emit("getOnlineStatus", Object.keys(socketOptions));
  });
});

export { app, server, socket };
