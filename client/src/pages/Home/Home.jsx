import MessageContainer from "../../components/Messages/MessageContainer";
import SideBar from "../../components/SideBar/SideBar";
import useConversationStore from "../../stores/conversation.store";

const Home = () => {
  const { showSidebar } = useConversationStore();
  return (
    <div className="h-[550px] w-[1000px] flex">
      <div className={`${showSidebar ? "" : "w-0"}`}>
        <SideBar />
      </div>
      <MessageContainer />
    </div>
  );
};

export default Home;
