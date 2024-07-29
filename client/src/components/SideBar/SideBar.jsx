import { useState } from "react";
import "./style/sidebar.css";

import useConversationStore from "../../stores/conversation.store";
import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const SideBar = () => {
  const [searchQuery, setSearchQuery] = useState();
  const { showSidebar } = useConversationStore();

  const typeSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div
      id="side-bar"
      className={`${
        showSidebar ? "flex" : "collapse"
      } flex-col transition-all gap-6 border-r border-slate-500 px-4 py-4 h-full`}
    >
      <SearchInput onChange={(e) => typeSearchQuery(e)} />
      <div className="divider h-1 my-0 py-0" />
      <div className="h-full overflow-auto">
        <Conversations searchQuery={searchQuery} />
      </div>

      <div className="flex-1 flex items-end">
        <LogoutButton />
      </div>
    </div>
  );
};

export default SideBar;
