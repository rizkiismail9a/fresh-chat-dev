import Message from "./Message";

const Messages = ({ messages }) => {
  return (
    <div className="p-4 flex-1 overflow-auto">
      {messages?.map((item) => (
        <Message message={item} key={item._id} />
      ))}
    </div>
  );
};

export default Messages;
