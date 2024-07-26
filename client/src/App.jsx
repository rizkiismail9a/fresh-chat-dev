import { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
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

  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <Toaster />
      {loading && <Loading />}
      <MainLayout>
        <Routes>
          <Route
            path="/"
            element={!authedUser._id ? <Navigate to={"/login"} /> : <Home />}
          />
          <Route
            path="/login"
            element={authedUser._id ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authedUser._id ? <Navigate to={"/"} /> : <SignUp />}
          />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
