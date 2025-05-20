import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "../services/auth.services";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  const userId = user?.id;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-extrabold tracking-wide hover:text-indigo-400 transition duration-300">
        BlogApp
      </Link>

      <div className="space-x-6 flex items-center text-lg">
        <Link
          to={userId ? `/blog/home?authorId=${userId}` : "/blog/home"}
          className="hover:text-indigo-400 transition duration-300"
        >
          Home
        </Link>
        

        {user ? (
          <>
           <Link
              to={`/blog/portfolio/${userId}`}
              className="hover:text-indigo-400 transition duration-300"
            >
              Portfolio
            </Link>
            <Link
              to="/blog/createblog"
              className="hover:text-indigo-400 transition duration-300"
            >
              Create Blog
            </Link>
             <Link
              to="/blog/createportfolio"
              className="hover:text-indigo-400 transition duration-300"
            >
             Create Portfolio
            </Link>
            <Link
              to="/blog/profile"
              className="font-semibold hover:text-indigo-400 transition duration-300"
            >
              Profile

            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-200 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-400 transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-400 transition duration-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
