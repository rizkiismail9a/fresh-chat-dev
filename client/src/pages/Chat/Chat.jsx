import "../../components/SideBar/style/sidebar.css";

import Helmet from "react-helmet";

import MessageContainer from "../../components/Messages/MessageContainer";

const Chat = () => {
  return (
    <div className="chats w-full h-full flex">
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

      <MessageContainer />
    </div>
  );
};

export default Chat;
