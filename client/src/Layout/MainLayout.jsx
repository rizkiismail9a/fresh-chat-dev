import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="bg-clip-padding backdrop-filter tablet:w-auto overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0 shadow-lg w-[90%] tablet:h-[unset] h-auto">
      {children}
    </div>
  );
};

MainLayout.prototypes = {
  children: PropTypes.node,
};

export default MainLayout;
