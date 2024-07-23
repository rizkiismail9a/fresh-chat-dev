import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConversationsServices from "../services/conversation.services";

const useGetConversations = (search = "") => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const { data } = await ConversationsServices.getConversationsData({
          search: search.length ? search.trim() : null,
        });

        setConversations(data.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get conversation list");
      }
    };

    getConversations();
  }, [search]);

  return { conversations };
};

export default useGetConversations;
