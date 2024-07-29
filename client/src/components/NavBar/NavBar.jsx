import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import useConversationStore from "../../stores/conversation.store";

const NavBar = () => {
  const { setShowSidebar, showSidebar } = useConversationStore();

  return (
    <div className="h-[60px] bg-clip-padding backdrop-filter w-[1000px] overflow-hidden rounded-lg backdrop-blur-sm bg-opacity-0 shadow-lg flex items-center px-4">
      <div className="flex justify-between items-center w-full">
        <TbLayoutSidebarRightCollapse
          className="h-6 w-6 text-gray-50 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
        <div>
          <img
            src="/boy.webp"
            alt="profile placeholder"
            className="h-10 w-10 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NavBar;