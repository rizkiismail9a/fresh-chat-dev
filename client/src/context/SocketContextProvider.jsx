import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./auth.context";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authedUser } = useAuthContext();

  useEffect(() => {
    if (authedUser._id) {
      const socket = io("https://fresh-chat-dev.vercel.app", {
        query: {
          userId: authedUser._id,
        },
      });

      setSocket(socket);

      // Data event is socketOptions in the server
      socket?.on("getOnlineStatus", (dataEvent) => {
        setOnlineUsers(dataEvent);
      });

      return () => socket?.close();
    } else {
      if (socket) {
        socket?.close();
      }
    }
    // Don't input the socket as depedencies as socket variable will always changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authedUser]);

  return (
    <SocketContext.Provider value={{ onlineUsers, socket }}>
      {children}
    </SocketContext.Provider>
  );
};
