import { useSocketContext } from "../../context/socket.context";
import useConversationStore from "../../stores/conversation.store";

const Conversation = ({ conversation, isLastIndex }) => {
  const { selectedConversation, setSelectedConversation } =
    useConversationStore();

  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <button
        data-section="container"
        onClick={() => setSelectedConversation(conversation)}
        className={`flex gap-2 w-full items-center px-2 py-1 bg-clip-padding hover:bg-orange-500 hover:bg-opacity-60 cursor-pointer ${
          selectedConversation?._id === conversation._id ? "bg-orange-500" : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-10 rounded-full">
            <img src={conversation.profileImg} alt={conversation.fullName} />
          </div>
        </div>
        <div className="text-gray-100 text-sm leading-normal">
          <span>{conversation.fullName}</span>
        </div>
      </button>
      {!isLastIndex && <div className="divider h-1 my-0 py-0" />}
    </>
  );
};

export default Conversation;
