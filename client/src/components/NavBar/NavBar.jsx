import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/auth.context";
import useConversationStore from "../../stores/conversation.store";
import UpdateUserDialog from "./UpdateUserDialog";

const NavBar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setShowSidebar, showSidebar } = useConversationStore();
  const { authedUser } = useAuthContext();
  const imgSrc = authedUser.gender === "male" ? "/boy.webp" : "girl.webp";
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <UpdateUserDialog
        imgSrc={imgSrc}
        onClose={() => setIsDialogOpen(false)}
        visibility={isDialogOpen}
      />
      <div className="h-[60px] bg-clip-padding backdrop-filter tablet:w-[1000px] w-[90%] overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0 shadow-lg flex items-center px-4">
        <div className="flex justify-between items-center w-full">
          {pathname === "/chat" && (
            <IoMdArrowRoundBack
              className="h-6 w-6 text-gray-50 cursor-pointer tablet:hidden block"
              onClick={() => navigate("/chats")}
            />
          )}

          {pathname === "/home" && (
            <TbLayoutSidebarRightCollapse
              className="h-6 w-6 text-gray-50 cursor-pointer tablet:block hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            />
          )}
          <div className="flex flex-1 justify-end items-center gap-4">
            <p className="text-gray-50 font-semibold text-md p-0">
              {authedUser.fullName}
            </p>
            <img
              src={imgSrc}
              alt="profile placeholder"
              className="h-10 w-10 object-cover cursor-pointer"
              onClick={() => setIsDialogOpen(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
