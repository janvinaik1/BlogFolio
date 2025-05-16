
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="bg-gray-950 min-h-screen text-white flex flex-col">
      <main className="flex-1 px-4 py-6 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
