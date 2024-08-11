import { useEffect } from "react";
import toast from "react-hot-toast";
import ConversationsServices from "../services/conversation.services";
import useConversationStore from "../stores/conversation.store";

/*
 * Get the user profile list based on the search query, when the search is empty,
 * it will return old messages history
 *
 */
const useGetConversations = (search = "") => {
  const { selectedConversation, conversations, setConversations } =
    useConversationStore();
  const { setLoading } = useConversationStore();

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const { data } = await ConversationsServices.getConversationsData({
          search: search.length ? search.trim() : null,
        });

        setConversations(data.data.users);
        // Store in sessionStorage, too
        sessionStorage.setItem(
          "conversations",
          JSON.stringify(data.data.users)
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to get conversation list");
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, [search, setLoading, setConversations, selectedConversation]);

  return { conversations };
};

export default useGetConversations;
