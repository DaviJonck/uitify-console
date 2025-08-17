import SideMenu from "./components/ui/SideMenu";
import MainContent from "./components/ui/MainContent";

function App() {
  return (
    <div className="bg-gray-50 min-h-screen lg:h-screen flex flex-col lg:flex-row lg:overflow-hidden">
      <SideMenu />
      <MainContent />
    </div>
  );
}

export default App;
