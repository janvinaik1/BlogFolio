import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import blogService from "../services/blog.services";
import MDEditor from "@uiw/react-md-editor";

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await blogService.getBlogById(id);
        setBlog(response);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError(err.message || "Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const isAuthor = user && blog?.author?._id === user._id;
  console.log("author umm:",isAuthor);
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      await blogService.deleteBlog(id, token);
      navigate("/blogs/home"); 
    } catch (err) {
      setError("Failed to delete blog");
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-lg">Loading blog...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:underline"
        >
          ← Back
        </button>
      </div>

      <div className="rounded-md shadow-lg overflow-hidden">
        {blog.coverImage && (
          <img
            src={blog.coverImage}
            alt="Cover"
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6 bg-white">
          <h1 className="text-3xl font-bold mb-2 text-black">{blog.title}</h1>
          <div className="flex items-center text-sm text-black mb-4">
            <span>By {blog.author?.username}</span>
            <span className="mx-2">•</span>
            <span>{blog.readTime} min read</span>
          </div>

          <div className="mb-6 text-sm text-black">
            {blog.tags?.map((tag, index) => (
              <span
                key={index}
                className="mr-2 px-2 py-1 bg-gray-200 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="prose prose-lg max-w-none">
            <MDEditor.Markdown source={blog.content} />
          </div>

          {isAuthor && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/blog/edit/${id}`)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      )}
        </div>
      </div>
      
    </div>
  );
};

export default BlogDetailPage;
