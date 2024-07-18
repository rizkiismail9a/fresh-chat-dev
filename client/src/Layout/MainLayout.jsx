import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div
      data-section="signup-wrapper"
      className="bg-red-400 bg-clip-padding backdrop-filter w-auto backdrop-blur-sm bg-opacity-0"
    >
      {children}
    </div>
  );
};

MainLayout.prototypes = {
  children: PropTypes.node,
};

export default MainLayout;
