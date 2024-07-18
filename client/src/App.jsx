import MainLayout from "./Layout/MainLayout";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <MainLayout>
        {/* <Login /> */}
        <SignUp />
      </MainLayout>
    </div>
  );
}

export default App;
