const Loading = () => {
  return (
    <div className="absolute flex items-center justify-center w-screen min-h-screen bg-slate-500 bg-opacity-50 z-10">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
};

export default Loading;
