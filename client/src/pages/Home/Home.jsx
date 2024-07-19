import MessageContainer from "../../components/Messages/MessageContainer";
import SideBar from "../../components/SideBar/SideBar";

const Home = () => {
  return (
    <div className="h-[550px] flex">
      <SideBar />
      <MessageContainer />
    </div>
  );
};

export default Home;
