const Message = () => {
  return (
    <>
      <div className="chat chat-end">
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
            <div className="chat-bubble text-gray-50 bg-sky-500">
              Hey, makan bareng yuk!
            </div>
            <div className="chat-footer">12.30</div>
          </div>
        </div>
      </div>
      <div className="chat chat-start">
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
            <div className="chat-bubble text-black bg-sky-200">
              Kasih ceramah dulu ke si Widia
            </div>
            <div className="chat-footer">12.30</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
