import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div
      data-section="signup-wrapper"
      className=" bg-clip-padding backdrop-filter w-auto overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0"
    >
      {children}
    </div>
  );
};

MainLayout.prototypes = {
  children: PropTypes.node,
};

export default MainLayout;
