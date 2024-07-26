import { useEffect } from "react";

import { useSocketContext } from "../context/socket.context.js";
import useConversationStore from "../stores/conversation.store.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  useEffect(() => {
    socket?.on("newMessage", (dataEmit) => {
      // dataEmit.shouldShake = true;
      const newMessages = dataEmit?.data;
      const senderId = dataEmit.senderId;

      if (selectedConversation._id === senderId) {
        if (messages && messages.length) {
          setMessages([...messages, newMessages]);
        } else {
          setMessages([newMessages]);
        }
      }
    });
    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages, selectedConversation]);
};

export default useListenMessages;
