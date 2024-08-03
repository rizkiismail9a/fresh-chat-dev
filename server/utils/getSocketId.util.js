const socketOptions = require("../socket/socket.js");

function getSocketId(recieverId) {
  return socketOptions[recieverId];
}

module.exports = getSocketId;
