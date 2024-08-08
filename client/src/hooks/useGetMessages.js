import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

/*
 *
 * Get message hook to get messages history from API where it accepts two parameters
 * @params:
 * page: the number of page to be fetched
 * limit: the amount of message to be returned by API
 *
 */

const useGetMessages = (page, limit) => {
  const storedSession = JSON.parse(sessionStorage.getItem("active-chat"))._id;
  const { selectedConversation } = useConversationStore();
  const [currentId, setCurrentId] = useState("");
  const [gottenMessages, setGottenMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const conversationId = storedSession
    ? storedSession
    : selectedConversation._id;

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data } = await MessagesServices.getMessages(conversationId, {
          limit,
          page,
        });

        // Prev is needed since we have to keep old message everytime page is changing
        if (data.data.messages) {
          setGottenMessages((prev) => [...data.data.messages, ...prev]);
        }
      } catch (error) {
        console.error("error get message", error);
        toast.error("Failed to get messages");
      } finally {
        setLoading(false);
      }
    };

    /*
     * Reset the messages everytime user select new conversation
     */
    if (currentId !== selectedConversation?._id) {
      setCurrentId(selectedConversation?._id);
      setGottenMessages([]);
    }

    if (conversationId) getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, page, limit, conversationId, storedSession]);

  return { gottenMessages, loading };
};

export default useGetMessages;
