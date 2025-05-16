import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import blogService from "../services/blog.services";
import BlogCard from "../components/BlogCard";

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const authorId = queryParams.get("authorId");
  console.log(authorId);
  const initialSearch = queryParams.get("search") || "";
  const tag = queryParams.get("tag") || "";

  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [pendingQuery, setPendingQuery] = useState(initialSearch);
  const [tagFilter, settagFiltery] = useState(tag);

  const fetchBlogs = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [page, tagFilter, authorId, searchQuery]);

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
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.deletePost(id);
      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {initialSearch && (
        <div className="mb-4">
          <button
            onClick={() => {
              const params = new URLSearchParams(location.search);
              params.delete("search");

              navigate({ search: params.toString() }, { replace: true });
              setSearchQuery("");
              setPendingQuery("");
              setPage(1);
            }}
            className="text-white hover:underline"
          >
            ← Back
          </button>
        </div>
      )}

      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Recent Blogs
      </h1>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={pendingQuery}
          onChange={(e) => setPendingQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white mb-4"
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Press Enter to search
        </p>
      </div>

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

      <div className="mt-10 flex justify-center items-center space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600 dark:text-white text-lg font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
