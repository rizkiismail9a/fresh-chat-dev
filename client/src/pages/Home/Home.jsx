import Helmet from "react-helmet";

import MessageContainer from "../../components/Messages/MessageContainer";
import SideBar from "../../components/SideBar/SideBar";
import useConversationStore from "../../stores/conversation.store";

const Home = () => {
  const { showSidebar } = useConversationStore();
  return (
    <div className="h-[550px] w-[1000px] flex">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        <title>Home - Fresh Chat Dev</title>
      </Helmet>
      <div className={`${showSidebar ? "" : "w-0"}`}>
        <SideBar />
      </div>
      <MessageContainer />
    </div>
  );
};

export default Home;
