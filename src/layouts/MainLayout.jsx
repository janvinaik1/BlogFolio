
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
