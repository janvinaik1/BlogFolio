import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setUsername(user.username);
    }
  }, []);

  const internalShareableLink = `/public/portfolio/${userId}`;

  if (!userId || !username) return <p className="p-6 text-lg">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Welcome, {username}!</h1>

      <div className="mb-6">
        <p className="text-lg">
          🔗 Share your portfolio and blogs:
        </p>
        <Link
          to={internalShareableLink}
          className="text-blue-600 underline break-all"
        >
          {window.location.origin + internalShareableLink}
        </Link>
      </div>

      <div className="space-y-4">
        <button
          onClick={() => navigate("/blog/createportfolio")}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          ✨ Create Portfolio
        </button>

        <button
          onClick={() => navigate("/customize")}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          🎨 Customize Portfolio Theme
        </button>

        <button
          onClick={() => navigate("/blog/create")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          📝 Create Blog
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
