import { useState } from "react";
import "../../components/SideBar/style/sidebar.css";

import Conversations from "../../components/SideBar/Conversations";
import LogoutButton from "../../components/SideBar/LogoutButton";
import SearchInput from "../../components/SideBar/SearchInput";

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState();

  const typeSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div id="chats" className="flex flex-col transition-all gap-6 p-4">
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

export default Chats;
