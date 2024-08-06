import { useEffect, useRef, useState } from "react";
import { FaCircleArrowDown } from "react-icons/fa6";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import useConversationStore from "../../stores/conversation.store";
import MessageSkeleton from "../Skeleton/ConversationSkeleton";
import Message from "./Message";

// New message is array from message input and listen new message
const Messages = ({ newMassage }) => {
  const lastMessageRef = useRef();
  const messageContainer = useRef();
  const [messages, setMessages] = useState([]);
  const { page, setPage, userScroll, setUserScroll } = useConversationStore();
  const [showScrollArrow, setShowScrollArrow] = useState(false);
  const { gottenMessages, loading } = useGetMessages(page, 10);

  const { listenedMessage } = useListenMessages();

  // Scroll to the most bottom of the page
  const scrollToBottom = () => {
    const messageContainer = document.getElementById("message-container");
    messageContainer.scrollTo({
      top: messageContainer.scrollHeight,
      behavior: "smooth",
    });
    setShowScrollArrow(false);
  };

  /*
   * When all messages has been got from API,
   * input he gotten message input messages hook
   *
   */
  useEffect(() => {
    if (!loading) {
      setMessages(gottenMessages);
    }
  }, [gottenMessages, loading]);

  // If socket emit new litened messages, just put it in the very bottom of the list
  useEffect(() => {
    setShowScrollArrow(true);
    setMessages((prev) => [...prev, ...listenedMessage]);
  }, [listenedMessage]);

  /*
   * Scroll to the latest message when user have new message
   * Set timeout to make sure the fetching data is finish first
   */
  useEffect(() => {
    setTimeout(() => {
      if (!userScroll) {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  }, [messages, userScroll]);

  // Fetch the next page of messages when user reach the end of the container
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");

    const handleScroll = (e) => {
      setUserScroll(true);
      if (e.target.scrollTop === 0 && userScroll) {
        setPage(page + 1);
      }
    };

    messageContainer.addEventListener("scroll", handleScroll);
    return () => messageContainer.removeEventListener("scroll", handleScroll);
  }, [page, setPage, setUserScroll, userScroll]);

  // If the newMessage is coming, just push it in the end of the gotten messages
  useEffect(() => {
    if (newMassage) {
      setMessages((prev) => [...prev, ...newMassage]);
    }
  }, [newMassage]);

  // Show the scroll arrow if user scrolling to top
  useEffect(() => {
    const handleScroll = () => {
      if (messageContainer.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          messageContainer.current;
        const isAtBottom = scrollTop + clientHeight >= scrollHeight;
        setShowScrollArrow(!isAtBottom);
      }
    };

    const container = messageContainer.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      id="message-container"
      className="p-4 flex-1 flex flex-col gap-2 overflow-auto"
      ref={messageContainer}
    >
      <div>{loading && <MessageSkeleton />}</div>
      {messages.length &&
        messages?.map((item, index) => (
          <div
            key={item._id}
            ref={index === messages.length - 1 ? lastMessageRef : null}
          >
            {/* Ref can only be refered into one DOM element at one time, thus the looping will overwritten the ref props and end up with the last one */}
            <Message message={item} />
          </div>
        ))}

      {showScrollArrow && (
        <button
          onClick={scrollToBottom}
          className="flex absolute bottom-20 left-1/2 transform -translate-x-1/2 gap-3 text-orange-500 text-sm p-2 rounded-badge bg-gray-50 items-center cursor-pointer shadow-sm"
        >
          <span>New Messages</span>
          <FaCircleArrowDown />
        </button>
      )}
    </div>
  );
};

export default Messages;
