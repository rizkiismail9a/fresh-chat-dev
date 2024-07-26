import { useEffect } from "react";

import { useSocketContext } from "../context/socket.context.js";
import useConversationStore from "../stores/conversation.store.js";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversationStore();

  useEffect(() => {
    socket?.on("newMessage", (dataEmit) => {
      dataEmit.shouldShake = true;
      const newMessages = dataEmit.data;
      setMessages([...messages, newMessages]);
    });
    return () => socket?.off("newMessage");
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
