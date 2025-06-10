import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import blogService from "../services/blog.services";

const EditBlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    setError("User not found. Please log in again.");
    return;
  }

  const user = JSON.parse(storedUser);
  const userId = user.id;
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    coverImage: "",
    readTime: "",
    coverImageFile: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = localStorage.getItem("token");
        const blog = await blogService.getBlogById(id, token);
        setFormData({
          title: blog.title,
          content: blog.content,
          tags: blog.tags.join(", "),
          coverImage: blog.coverImage,
          readTime: blog.readTime,
        });
      } catch (err) {
        setError("Failed to load blog data");
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append(
        "tags",
        JSON.stringify(formData.tags.split(",").map((t) => t.trim()))
      );
      form.append("readTime", formData.readTime);

      if (formData.coverImageFile) {
        form.append("coverImage", formData.coverImageFile); // local file
      } else {
        form.append("coverImage", formData.coverImage); // URL fallback
      }

      await blogService.editPost(id, form, token); // pass FormData
      navigate(`/blog/home?authorId=${userId}`);
    } catch (err) {
      console.error(err);
      setError("Failed to update blog post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-2xl mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        ✍️ Edit Blog Post
      </h1>

      {error && (
        <p className="text-red-500 font-medium mb-4 bg-red-100 dark:bg-red-800 p-3 rounded-lg">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content (Markdown)
          </label>
          <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <MDEditor
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, content: value }))
              }
              height={400}
            />
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tags (comma separated)
          </label>
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g., tech, coding, react"
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Cover Image Section */}
        {/* Cover Image Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cover Image
          </label>

          {/* Option 1: URL input */}
          <input
            name="coverImage"
            value={formData.coverImage}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                coverImage: e.target.value,
                coverImageFile: null, // Clear file if URL changes
              }))
            }
            placeholder="https://example.com/image.jpg"
            className="w-full mb-3 p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Option 2: File input */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setFormData((prev) => ({
                  ...prev,
                  coverImageFile: file,
                  coverImage: "", // Clear URL if file selected
                }));
              }
            }}
            className="w-full mb-3 text-gray-900 dark:text-gray-100"
          />

          {/* Show selected file name */}
          {formData.coverImageFile && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Selected file:{" "}
              <span className="font-medium">
                {formData.coverImageFile.name}
              </span>
            </p>
          )}

          {/* Preview Image */}
          {(formData.coverImageFile || formData.coverImage) && (
            <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden max-w-xs max-h-48">
              <img
                src={
                  formData.coverImageFile
                    ? URL.createObjectURL(formData.coverImageFile)
                    : formData.coverImage
                }
                alt="Cover Preview"
                className="object-cover w-full h-48"
                onLoad={(e) => {
                  // Release object URL after load to avoid memory leaks
                  if (formData.coverImageFile) {
                    URL.revokeObjectURL(e.target.src);
                  }
                }}
              />
            </div>
          )}
        </div>

        {/* Read Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estimated Read Time (minutes)
          </label>
          <input
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            type="number"
            min={1}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogForm;
