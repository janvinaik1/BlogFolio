import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react"; // Add this import
import blogService from "../services/blog.services";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get("authorId");
  const initialSearch = queryParams.get("search") || "";
  const tag = queryParams.get("tag") || "";

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [pendingQuery, setPendingQuery] = useState(initialSearch);
  const [tagFilter, setTagFilter] = useState(tag);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add missing error state

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData && userData.id) {
      setUser(userData);
    }
  }, []);

  // Use useCallback to prevent unnecessary re-renders
  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null); // Clear any previous errors
      let response;
      
      if (searchQuery.trim() !== "") {
        response = await blogService.search(searchQuery);
        setBlogs(response);
        setTotalPages(1);
      } else {
        response = await blogService.getAllBlogs({
          authorId,
          page,
          tag: tagFilter,
        });
        setBlogs(response.blogs);
        setTotalPages(response.totalPages);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setError(err.message || "Failed to fetch blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, authorId, page, tagFilter]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const params = new URLSearchParams(location.search);
      if (pendingQuery.trim()) {
        params.set("search", pendingQuery);
      } else {
        params.delete("search");
      }
      navigate({ search: params.toString() }, { replace: true });
      setSearchQuery(pendingQuery);
      setPage(1); // Reset to first page when searching
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deletePost(id);
      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);
      setError("Failed to delete blog post. Please try again.");
    }
  };

  const handleBackToAll = () => {
    const params = new URLSearchParams(location.search);
    params.delete("search");
    navigate({ search: params.toString() }, { replace: true });
    setSearchQuery("");
    setPendingQuery("");
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500/30 border-t-blue-500 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-500/20 border-r-purple-500 animate-spin-reverse mx-auto"></div>
          </div>
          <p className="text-gray-300 text-lg font-medium">Loading Blogs...</p>
          <p className="text-gray-500 text-sm mt-2">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="bg-red-900/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl">
          <div className="bg-red-500/20 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-red-300 text-xl font-semibold mb-3">
            Something went wrong
          </h2>
          <p className="text-gray-300 mb-6 leading-relaxed">{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchBlogs();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-red-500/25 hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {initialSearch && (
          <div className="mb-4">
            <button
              onClick={handleBackToAll}
              className="text-white hover:underline transition-all duration-200 hover:text-blue-400"
            >
              ← Back to all blogs
            </button>
          </div>
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {searchQuery ? `Search Results for "${searchQuery}"` : "Recent Blogs"}
          </h1>

          {user && (
            <button
              onClick={() => navigate("/blog/createblog")}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Create Blog
            </button>
          )}
        </div>

        <div className="mb-8">
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-2">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <input
              type="text"
              placeholder="Search blogs..."
              value={pendingQuery}
              onChange={(e) => setPendingQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pl-16 pr-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:focus:ring-emerald-900 transition-all duration-300 text-lg placeholder-gray-400 shadow-sm"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 ml-2">
            <span className="inline-flex items-center gap-1">
              <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                Enter
              </kbd>
              to search
            </span>
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-800/50 rounded-2xl p-8 max-w-md mx-auto">
              <div className="text-gray-400 mb-4">
                <svg
                  className="w-16 h-16 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                {searchQuery ? "No blogs found" : "No blogs yet"}
              </h3>
              <p className="text-gray-400">
                {searchQuery 
                  ? `No blogs match your search for "${searchQuery}"`
                  : "Be the first to create a blog post!"
                }
              </p>
              {user && !searchQuery && (
                <button
                  onClick={() => navigate("/blog/createblog")}
                  className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                >
                  Create Your First Blog
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {blogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
                onDelete={handleDelete}
                onEdit={(id) => navigate(`/blog/edit/${id}`)}
              />
            ))}
          </div>
        )}

        
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-white text-lg font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;