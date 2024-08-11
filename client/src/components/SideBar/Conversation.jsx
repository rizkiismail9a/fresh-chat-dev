import { LuDot } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import { useSocketContext } from "../../context/socket.context";
import useResize from "../../hooks/useResize";
import useConversationStore from "../../stores/conversation.store";

const Conversation = ({ conversation, isLastIndex }) => {
  const storedSession = JSON.parse(sessionStorage.getItem("active-chat"));
  const { authedUser } = useAuthContext();
  const {
    selectedConversation,
    setSelectedConversation,
    setPage,
    setUserScroll,
  } = useConversationStore();
  const navigate = useNavigate();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const { isOnMobile } = useResize();
  const activeConversation = storedSession
    ? storedSession
    : selectedConversation;

  /*
   * Select a conversation to be displayed
   * Reset every global state between the message container and the sidebar
   */
  const selectConversation = () => {
    sessionStorage.setItem("active-chat", JSON.stringify(conversation));
    setUserScroll(false);
    setPage(1);
    setSelectedConversation(conversation);
    if (isOnMobile) {
      navigate("/chat");
    }
  };

  return (
    <>
      <button
        data-section="container"
        onClick={selectConversation}
        className={`flex gap-2 w-full items-center px-2 py-1 bg-clip-padding hover:bg-orange-500 hover:bg-opacity-60 cursor-pointer ${
          activeConversation?._id === conversation._id
            ? "tablet:bg-orange-500"
            : ""
        }`}
      >
        <div className={`avatar ${isOnline ? "online" : ""} `}>
          <div className="w-10 rounded-full">
            <img src={conversation.profileImg} alt={conversation.fullName} />
          </div>
        </div>
        <div className="text-gray-100 flex items-center justify-between text-sm leading-normal w-full">
          <span>{conversation.fullName}</span>
          {/* Should be false, not undefined or null */}
          {conversation?.isRead === false &&
            conversation?.lastSender?.toString() !== authedUser?._id && (
              <LuDot className="text-[2.3rem] text-orange-500" />
            )}
        </div>
      </button>
      {!isLastIndex && <div className="divider h-1 my-0 py-0" />}
    </>
  );
};

export default Conversation;
