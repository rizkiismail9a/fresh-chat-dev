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
  const { selectedConversation } = useConversationStore();
  const [currentId, setCurrentId] = useState("");
  const [gottenMessages, setGottenMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);
        const { data } = await MessagesServices.getMessages(
          selectedConversation._id,
          {
            limit,
            page,
          }
        );

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

    // Check if the current id is the same with the new selected on
    if (currentId !== selectedConversation._id) {
      setCurrentId(selectedConversation._id);
      setGottenMessages([]);
    }

    if (selectedConversation?._id) getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversation, page, limit]);

  return { gottenMessages, loading };
};

export default useGetMessages;
