import { TiMessages } from "react-icons/ti";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
  const noChatSelected = false;

  return (
    <div className="md:min-w-[450px] flex flex-col w-[700px]">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div
            data-section="header"
            className="bg-slate-400 px-4 py-2 mb-2 sticky top-0"
          >
            <span className="label-text text-gray-50">Laksmi Mentari</span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-50 font-semibold flex flex-col items-center gap-2">
        <p>Halo, Ratna!</p>
        <p>Mau kirim chat ke siapa?</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
