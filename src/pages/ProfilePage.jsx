import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShareAlt, FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [copiedLink, setCopiedLink] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setUsername(user.username);
    }
  }, []);

  const internalPortfolioLink = `${window.location.origin}/public/view/portfolio/${userId}`;
  const blogShareLink = `${window.location.origin}/public/home?authorId=${userId}`;

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(type);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  if (!userId || !username)
    return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-100 dark:from-gray-900 dark:to-gray-800 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl max-w-2xl w-full p-8 text-center">
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <FaUserCircle className="text-8xl text-blue-500 dark:text-blue-400" />
        </motion.div>

        <h1 className="text-3xl font-bold mt-4 text-gray-800 dark:text-white">
          Welcome, {username}{" "}
          <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mt-2 mb-6">
          Let’s build and share your awesome portfolio and blogs!
        </p>

        {/* Buttons */}
        <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            onClick={() => navigate(`/blog/portfolio/${userId}`)}
            className="text-green-400 border border-green-500 hover:bg-green-600 hover:text-white py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Go to Portfolio
          </button>
          <button
            onClick={() => navigate(`/blog/home?authorId=${userId}`)}
            className="text-blue-400 border border-blue-500 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105"
          >
            Go to Blog
          </button>
        </div>

        {/* Share Prompt */}
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-6">
          🚀 Share your portfolio and blogs with the world!
        </p>

        <div className="space-y-4 text-left">
          {/* Portfolio Link */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-800 dark:text-white">
              🔗 Portfolio Link
            </h2>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Click to copy your portfolio link
              </span>
              <button
                onClick={() =>
                  copyToClipboard(internalPortfolioLink, "portfolio")
                }
                className="text-blue-500 hover:text-blue-700"
                title="Copy link"
              >
                <FaShareAlt />
              </button>
            </div>
            {copiedLink === "portfolio" && (
              <p className="text-green-500 text-sm mt-1">
                Copied to clipboard!
              </p>
            )}
          </div>

          {/* Blog Share Link */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h2 className="font-semibold text-gray-800 dark:text-white">
              📝 Blogs Share Link
            </h2>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Click to copy your blog link
              </span>
              <button
                onClick={() => copyToClipboard(blogShareLink, "blog")}
                className="text-blue-500 hover:text-blue-700"
                title="Copy link"
              >
                <FaShareAlt />
              </button>
            </div>
            {copiedLink === "blog" && (
              <p className="text-green-500 text-sm mt-1">
                Copied to clipboard!
              </p>
            )}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes wave {
            0% { transform: rotate(0.0deg) }
            10% { transform: rotate(14.0deg) }
            20% { transform: rotate(-8.0deg) }
            30% { transform: rotate(14.0deg) }
            40% { transform: rotate(-4.0deg) }
            50% { transform: rotate(10.0deg) }
            60% { transform: rotate(0.0deg) }
            100% { transform: rotate(0.0deg) }
          }
          .animate-wave {
            animation: wave 2s infinite;
            display: inline-block;
          }
        `}
      </style>
    </motion.div>
  );
};

export default ProfilePage;
