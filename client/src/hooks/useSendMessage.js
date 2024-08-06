import { useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

/*
 * Send new messages to the sender
 * it will return object of one message
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
 * 
 */
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
