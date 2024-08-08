import "../../components/SideBar/style/sidebar.css";

import { useState } from "react";
import Helmet from "react-helmet";

import Conversations from "../../components/SideBar/Conversations";
import LogoutButton from "../../components/SideBar/LogoutButton";
import SearchInput from "../../components/SideBar/SearchInput";

const Chats = () => {
  const [searchQuery, setSearchQuery] = useState();

  const typeSearchQuery = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="chats flex flex-col transition-all gap-6 p-4">
      <Helmet>
        <meta charSet="utf-8" />

        <meta
          name="description"
          content="Fresh Chat home, find your friend, and start a chat"
        />
        <meta name="keywords" content="chatting, chatting app" />
        <meta name="author" content="Yuri Ostrovsky" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Fresh Chat Dev" />
        <meta
          property="og:description"
          content="Chatting app with React js and socket IO and mongo DB"
        />
        <meta
          property="og:image"
          content="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        />
        <title>Chat - Fresh Chat Dev</title>
      </Helmet>
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
