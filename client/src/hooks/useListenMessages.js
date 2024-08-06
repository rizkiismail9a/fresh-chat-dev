import { useEffect, useState } from "react";

import { useSocketContext } from "../context/socket.context.js";
import useConversationStore from "../stores/conversation.store.js";

/*
 * Listen for socket emit for new message, this is when someone send new message to user
 * It returns one message object
 * @example 
 * {
        "senderId": "senderId",
        "receiverId": "receiverId",
        "message": "ceng",
        "_id": "idMessage",
        "createdAt": "2024-08-06T14:33:27.202Z",
        "updatedAt": "2024-08-06T14:33:27.202Z",
        "__v": 0
    }
 */
const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { selectedConversation, setShowScrollArrow } = useConversationStore();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket?.on("newMessage", (dataEmit) => {
      const newMessages = dataEmit?.data;
      const senderId = dataEmit.senderId;

      if (selectedConversation._id === senderId) {
        setMessages([newMessages]);
        setShowScrollArrow(true);
      }
    });

    // Remove the event listener
    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages, selectedConversation, setShowScrollArrow]);

  return { listenedMessage: messages };
};

export default useListenMessages;
