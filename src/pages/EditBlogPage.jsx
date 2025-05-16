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
  const userId = user.id
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    coverImage: "",
    readTime: "",
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
      const updatedData = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()),
      };
      await blogService.editPost(id, updatedData, token);
      navigate(`/blog/home?authorId=${userId}`);
    } catch (err) {
      setError("Failed to update blog post");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Edit Blog Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={formData.title} onChange={handleChange} />
        <MDEditor value={formData.content} onChange={(value) => setFormData((prev) => ({ ...prev, content: value }))} />
        <input name="tags" value={formData.tags} onChange={handleChange} />
        <input name="coverImage" value={formData.coverImage} onChange={handleChange} />
        <input name="readTime" value={formData.readTime} onChange={handleChange} type="number" />
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlogForm;
