import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
    <div className="md:min-w-[450px] flex flex-col w-[700px]">
      <div
        data-section="header"
        className="bg-slate-400 px-4 py-2 mb-2 sticky top-0"
      >
        <span className="label-text text-gray-50">Laksmi Mentari</span>
      </div>

      <Messages />
      <MessageInput />
    </div>
  );
};

export default MessageContainer;
