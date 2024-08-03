const socketOptions = require("../options/socketOptions.js");

function getSocketId(recieverId) {
  return socketOptions[recieverId];
}

module.exports = getSocketId;
