import MainLayout from "./Layout/MainLayout";
import Home from "./pages/Home/Home";

function App() {
  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <MainLayout>
        {/* <Login /> */}
        {/* <SignUp /> */}
        <Home />
      </MainLayout>
    </div>
  );
}

export default App;
