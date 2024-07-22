import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ConversationsServices from "../../services/conversation.services";
import Conversation from "./Conversation";

const Conversations = () => {
  const [conversations, setConversations] = useState();

  useEffect(() => {
    getConversations();
  }, []);

  // Get list of conversations
  const getConversations = async () => {
    try {
      const { data } = await ConversationsServices.getConversations();

      setConversations(data.data.users);
    } catch (error) {
      console.error(error);
      toast.error("Failed to get conversation list");
    }
  };

  return (
    <div>
      {conversations?.map((conv) => {
        return (
          <Conversation
            name={conv.fullName}
            picture={conv.profileImg}
            key={conv._id}
          />
        );
      })}
    </div>
  );
};

export default Conversations;
