import { socketOptions } from "../socket/socket.js";

export const getSocketId = (recieverId) => {
  return socketOptions[recieverId];
};
