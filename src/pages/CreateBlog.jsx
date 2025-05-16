import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import blogService from "../services/blog.services";

const CreateBlogForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    coverImage: "",
    readTime: "",
  });

  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({ ...prevState, [name]: val }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    setError("User not found. Please log in again.");
    return;
  }

  const user = JSON.parse(storedUser);
  const userId = user.id || user._id; // support either format

  try {
    const blogData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== ""),
    };

    await blogService.createBlog(blogData, token);
    navigate(`/blog/home?authorId=${userId}`);
  } catch (err) {
    console.error("Blog creation failed:", err);
    setError(err.message || "Something went wrong");
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create a New Blog Post</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter your blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <MDEditor
            value={formData.content}
            onChange={(value) => setFormData({ ...formData, content: value })}
            height={400}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter tags (comma separated)"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cover Image URL
          </label>
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="Enter cover image URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Read Time (minutes)
          </label>
          <input
            type="number"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="e.g., 5"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Create Blog Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlogForm;
