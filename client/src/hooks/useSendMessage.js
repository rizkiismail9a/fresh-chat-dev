import { useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } =
    useConversationStore();

  const sendMessage = async (newMessage) => {
    try {
      setLoading(true);
      const { data } = await MessagesServices.sendMessage(
        selectedConversation?._id,
        newMessage
      );

      if (data.data.message) {
        if (messages) {
          setMessages([...messages, data.data]);
        } else {
          setMessages([data.data]);
        }
      }
    } catch (error) {
      console.error("error send message", error);
      if (error.response) toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};

export default useSendMessage;
