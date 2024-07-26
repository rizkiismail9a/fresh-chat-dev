import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  const lastMessageRef = useRef();
  const { messages } = useGetMessages();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }, [messages]);

  return (
    <div className="p-4 flex-1 flex flex-col gap-2 overflow-auto">
      {messages.length &&
        messages?.map((item) => (
          <div key={item._id} ref={lastMessageRef}>
            {/* Ref can only be refered into one DOM element at one time, thus the looping will overwritten the ref props and end up with the last one */}
            <Message message={item} />
          </div>
        ))}
    </div>
  );
};

export default Messages;
