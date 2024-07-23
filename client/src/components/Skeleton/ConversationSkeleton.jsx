const MessageSkeleton = () => {
  return (
    <div className="p-4 flex-1 flex flex-col gap-2 overflow-auto">
      <div className="flex gap-3 items-center">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 glass"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-12 w-60 glass"></div>
        </div>
      </div>
      <div className="flex gap-3 items-center justify-end">
        <div className="skeleton w-10 h-10 rounded-full shrink-0 glass"></div>
        <div className="flex flex-col gap-1">
          <div className="skeleton h-12 w-60 glass"></div>
        </div>
      </div>
    </div>
  );
};
export default MessageSkeleton;
