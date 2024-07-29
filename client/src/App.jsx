import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import { AuthContext } from "./context/AuthContext";
import Loading from "./Layout/Loading";
import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import useConversationStore from "./stores/conversation.store";

function App() {
  const { authedUser } = useContext(AuthContext);
  const { loading } = useConversationStore();
  const { pathname } = useLocation();

  return (
    <div className="p-4 flex flex-col gap-3 items-center justify-center h-screen">
      <Toaster />
      {loading && <Loading />}
      {pathname === "/home" && <NavBar />}
      <MainLayout>
        <Routes>
          <Route
            exact
            path="/home"
            element={!authedUser._id ? <Navigate to={"/login"} /> : <Home />}
          />
          <Route
            path="/login"
            element={authedUser._id ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authedUser._id ? <Navigate to={"/home"} /> : <SignUp />}
          />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
