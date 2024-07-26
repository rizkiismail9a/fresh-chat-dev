import { useContext } from "react";
import { SocketContext } from "./SocketContextProvider";

export const useSocketContext = () => {
  return useContext(SocketContext);
};
