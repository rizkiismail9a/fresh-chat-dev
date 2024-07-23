import { useAuthContext } from "../../context/auth.context";
import formatDate from "../../utils/formatDate.utils";

const Message = ({ message }) => {
  const { authedUser } = useAuthContext();

  return (
    <>
      <div
        className={`chat ${
          message.senderId === authedUser._id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <div
              className={`chat-bubble text-gray-50 ${
                message.senderId === authedUser._id
                  ? "bg-sky-500"
                  : "bg-orange-600"
              }`}
            >
              {message.message}
            </div>
            <div className="chat-footer text-gray-50">
              {formatDate(message.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
