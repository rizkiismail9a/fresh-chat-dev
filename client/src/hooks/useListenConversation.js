import { useEffect } from "react";
import { useSocketContext } from "../context/socket.context";
import useConversationStore from "../stores/conversation.store";

const useListenConversations = () => {
  const { socket } = useSocketContext();
  const { conversations, setConversations } = useConversationStore();
  useEffect(() => {
    socket?.on("newConversation", (dataEmit) => {
      const newConversation = dataEmit?.data?.users;

      if (newConversation) {
        if (conversations && conversations.length) {
          setConversations([...conversations, newConversation]);
        } else {
          setConversations([newConversation]);
        }
      }
    });

    // Remove the event listener
    return () => socket?.off("newConversation");
  }, [socket, conversations, setConversations]);
};

export default useListenConversations;
