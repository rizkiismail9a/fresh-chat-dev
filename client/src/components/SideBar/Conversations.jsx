import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = ({ searchQuery }) => {
  const { conversations } = useGetConversations(searchQuery);

  return (
    <div>
      {conversations?.map((conv, index) => {
        return (
          <Conversation
            conversation={conv}
            key={conv._id}
            isLastIndex={index === conversations.length - 1}
          />
        );
      })}
    </div>
  );
};

export default Conversations;
