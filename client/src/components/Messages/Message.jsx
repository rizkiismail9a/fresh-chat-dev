import { useAuthContext } from "../../context/auth.context";
import useConversationStore from "../../stores/conversation.store";
import formatDate from "../../utils/formatDate.utils";

const Message = ({ message }) => {
  const { authedUser } = useAuthContext();
  const { selectedConversation } = useConversationStore();
  const isFromMe = authedUser._id === message.senderId;
  const profileImg = isFromMe
    ? authedUser.profileImg
    : selectedConversation.profileImg;

  return (
    <>
      <div className={`chat ${isFromMe ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profileImg} alt="user avatar" />
          </div>
        </div>
        <div
          className={`chat-bubble text-gray-50 text-pretty break-words ${
            isFromMe ? "bg-sky-500" : "bg-orange-500"
          }`}
        >
          {message.message}
        </div>
        <div className="chat-footer text-xs text-gray-50">
          {formatDate(message.createdAt)}
        </div>
      </div>
    </>
  );
};

export default Message;
