import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MessagesServices from "../services/messages.services";
import useConversationStore from "../stores/conversation.store";

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
        setGottenMessages((prev) => [...data.data.messages, ...prev]);
      } catch (error) {
        console.error("error get message", error);
        toast.error("Failed to get messages");
      } finally {
        setLoading(false);
      }
    };

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
