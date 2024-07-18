const Conversation = () => {
  return (
    <>
      <div
        data-section="container"
        className="flex gap-2 items-center px-2 py-1 bg-clip-padding hover:bg-yellow-500 hover:bg-opacity-60 cursor-pointer"
      >
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="user avatar"
            />
          </div>
        </div>
        <div className="text-gray-100 text-sm leading-normal">
          <span>Laksmi Mentari</span>
        </div>
      </div>
      <div className="divider h-1 my-0 py-0" />
    </>
  );
};

export default Conversation;
