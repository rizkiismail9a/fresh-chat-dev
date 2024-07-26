import { useState } from "react";
import { BiSend } from "react-icons/bi";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const submitNewMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.length) return;
    await sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <form className="px-4 my-3" onSubmit={submitNewMessage}>
      <div className="w-full relative">
        <input
          type="text"
          id="input-message"
          placeholder="Send a message"
          value={newMessage}
          className="border text-sm rounded-lg focus:outline-none block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          onChange={(e) => setNewMessage(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="absolute inset-y-0 end-0 flex items-center pe-3"
        >
          {loading ? <div className="loading"></div> : <BiSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
