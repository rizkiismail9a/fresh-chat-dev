import { useAuthContext } from "../../context/auth.context";
import useConversationStore from "../../stores/conversation.store";
import formatDate from "../../utils/formatDate.utils";

const Message = ({ message }) => {
  const { authedUser } = useAuthContext();
  const { selectedConversation } = useConversationStore();
  const isFromMe = authedUser._id === message.senderId;
  const profileImg = isFromMe
    ? authedUser.userImage
    : selectedConversation.profileImg;

  return (
    <>
      <div className={`chat ${isFromMe ? "chat-end" : "chat-start"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={profileImg} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`chat-bubble text-gray-50 ${
              isFromMe ? "bg-sky-500" : "bg-orange-500"
            }`}
          >
            {message.message}
          </div>
        </div>
        <div className="chat-footer text-xs text-gray-50">
          {formatDate(message.createdAt)}
        </div>
      </div>
    </>
  );
};

export default Message;
