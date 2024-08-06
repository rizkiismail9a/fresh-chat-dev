import { useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation } = useConversationStore();
  const [newMessage, setNewMessage] = useState([]);

  const sendMessage = async (typedMessage) => {
    try {
      setLoading(true);
      const { data } = await MessagesServices.sendMessage(
        selectedConversation?._id,
        typedMessage
      );

      setNewMessage([data.data]);
    } catch (error) {
      console.error("error send message", error);
      if (error.response) toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage, newMessage };
};

export default useSendMessage;
