import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

const useGetMessages = () => {
  const { messages, selectedConversation, setMessages } =
    useConversationStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data } = await MessagesServices.getMessages(
          selectedConversation._id
        );

        setMessages(data.data.messages);
      } catch (error) {
        console.error("error get message", error);
        toast.error("Failed to get messages");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default useGetMessages;
