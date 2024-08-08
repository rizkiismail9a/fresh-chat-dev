import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { AuthContext } from "./context/AuthContext";
import useResize from "./hooks/useResize";
import Loading from "./Layout/Loading";
import MainLayout from "./Layout/MainLayout";
import Chat from "./pages/Chat/Chat";
import Chats from "./pages/Chats/Chats";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import useConversationStore from "./stores/conversation.store";

function App() {
  const { authedUser } = useContext(AuthContext);
  const { loading } = useConversationStore();
  const { pathname } = useLocation();
  useResize();
  // useInputFocusHandler();

  return (
    <div className="tablet:p-4 p-2 flex flex-col gap-3 items-center justify-center h-screen">
      <Toaster />
      {loading && <Loading />}
      {(pathname === "/home" || pathname.includes("chat")) && <NavBar />}
      <MainLayout>
        <Routes>
          <Route
            path="/home"
            element={!authedUser._id ? <Navigate to={"/login"} /> : <Home />}
          />
          <Route
            path="/chats"
            element={!authedUser._id ? <Navigate to={"/login"} /> : <Chats />}
          />
          <Route
            path="/chat"
            element={!authedUser._id ? <Navigate to={"/login"} /> : <Chat />}
          />
          <Route
            path="/login"
            element={authedUser._id ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authedUser._id ? <Navigate to={"/home"} /> : <SignUp />}
          />
          <Route path="/" element={<Navigate to={"/home"} />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
