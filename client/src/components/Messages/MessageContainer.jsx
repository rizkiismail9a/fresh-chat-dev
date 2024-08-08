import { useState } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/auth.context";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const storedSession = JSON.parse(sessionStorage.getItem("active-chat"));
  // const { selectedConversation } = useConversationStore();
  const noChatSelected = !storedSession?._id;
  const [typedMessage, setTypedMessage] = useState([]);
  const sendMessage = (dataEvent) => {
    setTypedMessage(dataEvent);
  };

  return (
    <div className="w-full tablet:w-[1000px] flex-1">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <div className="h-full flex flex-col relative">
          <div
            data-section="header"
            className="bg-slate-400 px-4 py-2 mb-2 sticky top-0"
          >
            <span className="label-text text-gray-50">
              to: {storedSession.fullName}
            </span>
          </div>

          <Messages newMassage={typedMessage} />

          <div className="sticky bottom-0">
            <MessageInput onInputChange={sendMessage} />
          </div>
        </div>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { authedUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-50 font-semibold flex flex-col items-center gap-2">
        <p>Halo, {authedUser.fullName}</p>
        <p>Find someone to start chatting</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
