const MainLayout = ({ children }) => {
  return (
    <div className="bg-clip-padding backdrop-filter tablet:w-auto overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0 shadow-lg w-[90%] tablet:h-[unset] h-auto">
      {children}
    </div>
  );
};

export default MainLayout;
