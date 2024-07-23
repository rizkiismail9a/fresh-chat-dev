import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConversationsServices from "../services/conversation.services";

const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await ConversationsServices.getConversations();

        setConversations(data.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get conversation list");
      }
    };

    getConversations();
  }, []);

  return { conversations };
};

export default useGetConversations;
