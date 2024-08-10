import { useEffect, useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";
import useConversationStore from "../../stores/conversation.store";

const MessageInput = ({ onInputChange }) => {
  const [typedMessage, setTypedMessage] = useState("");
  const { sendMessage, loading, newMessage } = useSendMessage();
  const { setUserScroll } = useConversationStore();

  const submitNewMessage = async (e) => {
    e.preventDefault();
    if (!typedMessage.length) return;
    setUserScroll(false);
    await sendMessage(typedMessage);
    setTypedMessage("");
  };

  useEffect(() => {
    onInputChange(newMessage);
  }, [newMessage, onInputChange]);

  return (
    <form className="px-4 my-3" onSubmit={submitNewMessage}>
      <div className="w-full relative">
        <input
          type="text"
          id="input-message"
          placeholder="Send a message"
          value={typedMessage}
          className="border text-sm rounded-lg focus:outline-none block w-full p-2.5 glass text-gray-900"
          onChange={(e) => setTypedMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? (
            <div className="loading"></div>
          ) : (
            <BiSend className="text-white" />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
