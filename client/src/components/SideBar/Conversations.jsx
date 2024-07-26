import { CiUser } from "react-icons/ci";
import useGetConversations from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = ({ searchQuery }) => {
  const { conversations } = useGetConversations(searchQuery);

  return (
    <div>
      {conversations.length ? (
        conversations?.map((conv, index) => {
          return (
            <Conversation
              conversation={conv}
              key={conv._id}
              isLastIndex={index === conversations.length - 1}
            />
          );
        })
      ) : (
        <NoChatFound />
      )}
    </div>
  );
};

const NoChatFound = () => {
  return (
    <div className="w-full flex flex-col items-center text-white">
      <p>No user found</p>
      <CiUser />
    </div>
  );
};

export default Conversations;
