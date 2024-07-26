import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConversationsServices from "../services/conversation.services";
import useConversationStore from "../stores/conversation.store";

const useGetConversations = (search = "") => {
  const [conversations, setConversations] = useState([]);
  const { setLoading } = useConversationStore();

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const { data } = await ConversationsServices.getConversationsData({
          search: search.length ? search.trim() : null,
        });

        setConversations(data.data.users);
      } catch (error) {
        console.error(error);
        toast.error("Failed to get conversation list");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [search, setLoading]);

  return { conversations };
};

export default useGetConversations;
