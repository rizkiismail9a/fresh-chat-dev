import { useState } from "react";

const useShowSidebar = () => {
  const [sideBarShowUp, setSideBarShowUp] = useState(true);

  const collapseSideBar = (isSideBarShown) => {
    setSideBarShowUp(isSideBarShown);
  };

  return { collapseSideBar, sideBarShowUp };
};

export default useShowSidebar;
