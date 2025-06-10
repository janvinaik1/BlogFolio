import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { X, Upload, Link, Image, Check } from "lucide-react";
import blogService from "../services/blog.services";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const fileInputForMd = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    readTime: "",
  });

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [useUrl, setUseUrl] = useState(false);
  const [error, setError] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: val }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith("image/")) {
      setCoverImageFile(files[0]);
      setUseUrl(false);
      setCoverImageUrl("");
    }
  };

  const handleMarkdownImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formDataCloud = new FormData();
      formDataCloud.append("file", file);
      formDataCloud.append("upload_preset", "blogimage");
      formDataCloud.append("cloud_name", "djwujm5ss");

      const res = await fetch("https://api.cloudinary.com/v1_1/djwujm5ss/image/upload", {
        method: "POST",
        body: formDataCloud,
      });

      const data = await res.json();
      const imageUrl = data.secure_url;

      const markdownImage = `![alt text](${imageUrl})`;

      setFormData((prev) => ({
        ...prev,
        content: prev.content ? `${prev.content}\n\n${markdownImage}` : markdownImage,
      }));
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      alert("Image upload failed. Try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("User not found. Please log in again.");
      setLoading(false);
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id || user._id;

    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("content", formData.content);
      form.append("readTime", formData.readTime);
      form.append("tags", formData.tags);

      if (useUrl && coverImageUrl) {
        form.append("coverImageUrl", coverImageUrl);
      } else if (coverImageFile) {
        form.append("image", coverImageFile);
      }

      await blogService.createBlog(form, token);
      navigate(`/blog/home?authorId=${userId}`);
    } catch (err) {
      console.error("Blog creation failed:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Create New Blog Post</h1>
          <p className="text-gray-400">Share your thoughts with the world</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-200">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              placeholder="Enter your blog title"
              required
              disabled={loading}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label htmlFor="content" className="block text-sm font-semibold text-gray-200">
              Content <span className="text-red-400">*</span>
            </label>
            <MDEditor
              id="content"
              value={formData.content}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, content: value || "" }))
              }
              height={400}
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => fileInputForMd.current?.click()}
              className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Image size={16} className="mr-2" />
              Insert Image
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputForMd}
              onChange={handleMarkdownImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label
              htmlFor="tags"
              className="block text-sm font-semibold text-gray-200"
            >
              Tags
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="Enter tags (comma separated)"
              disabled={loading}
            />
            <p className="text-sm text-gray-400">
              Separate multiple tags with commas
            </p>
          </div>

          {/* Cover Image */}
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-gray-200">
              Cover Image
            </label>

            {/* Toggle Buttons */}
            <div className="flex items-center space-x-2">
              <div className="flex bg-gray-700 rounded-lg p-1 border border-gray-600">
                <button
                  type="button"
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    !useUrl
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setUseUrl(false);
                    setCoverImageUrl("");
                  }}
                  disabled={loading}
                >
                  <Upload size={16} />
                  <span>Upload File</span>
                  {!useUrl && coverImageFile && (
                    <Check size={14} className="text-green-400" />
                  )}
                </button>
                <button
                  type="button"
                  className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                    useUrl
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-gray-600"
                  }`}
                  onClick={() => {
                    setUseUrl(true);
                    setCoverImageFile(null);
                  }}
                  disabled={loading}
                >
                  <Link size={16} />
                  <span>Paste URL</span>
                  {useUrl && coverImageUrl && (
                    <Check size={14} className="text-green-400" />
                  )}
                </button>
              </div>
            </div>

            {/* File Upload */}
            {!useUrl ? (
              <div className="space-y-4">
                {coverImageFile ? (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-lg border-2 border-gray-600">
                      <img
                        src={URL.createObjectURL(coverImageFile)}
                        alt="Selected cover"
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                      <button
                        type="button"
                        onClick={() => setCoverImageFile(null)}
                        className="absolute top-3 right-3 bg-gray-800 bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                        disabled={loading}
                      >
                        <X size={18} className="text-white" />
                      </button>
                    </div>
                    <div className="mt-2 text-sm text-gray-300 flex items-center space-x-2">
                      <Check size={16} className="text-green-400" />
                      <span>{coverImageFile.name}</span>
                      <span className="text-gray-500">
                        ({(coverImageFile.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                      isDragOver
                        ? "border-blue-400 bg-blue-900/20"
                        : "border-gray-600 hover:border-gray-500 hover:bg-gray-700/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files[0]?.type.startsWith("image/")) {
                          setCoverImageFile(e.target.files[0]);
                          setUseUrl(false);
                          setCoverImageUrl("");
                        }
                      }}
                      style={{ display: "none" }}
                      disabled={loading}
                    />
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                        <Image size={32} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-lg font-medium text-gray-200">
                          {isDragOver
                            ? "Drop image here"
                            : "Choose an image or drag it here"}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                      <button
                        type="button"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                      >
                        <Upload size={16} />
                        <span>Browse Files</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="url"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 pr-12"
                    disabled={loading}
                  />
                  {coverImageUrl && (
                    <button
                      type="button"
                      onClick={() => setCoverImageUrl("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
                      disabled={loading}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>

                {coverImageUrl && (
                  <div className="relative group">
                    <div className="relative overflow-hidden rounded-lg border-2 border-gray-600">
                      <img
                        src={coverImageUrl}
                        alt="Cover preview"
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.style.display = "none";
                          const errorBox = e.target.nextSibling;
                          if (errorBox) errorBox.style.display = "flex";
                          // Optionally clear invalid URL after some delay
                          setTimeout(() => setCoverImageUrl(""), 3000);
                        }}
                      />
                      <div
                        className="hidden w-full h-64 bg-gray-700 rounded-lg items-center justify-center"
                        style={{ display: "none" }}
                      >
                        <div className="text-center">
                          <X size={48} className="text-gray-500 mx-auto mb-2" />
                          <p className="text-gray-400">Failed to load image</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
                    </div>
                    <div className="mt-2 text-sm text-gray-300 flex items-center space-x-2">
                      <Check size={16} className="text-green-400" />
                      <span>Image loaded successfully</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Read Time */}
          <div className="space-y-2">
            <label
              htmlFor="readTime"
              className="block text-sm font-semibold text-gray-200"
            >
              Read Time (minutes) <span className="text-red-400">*</span>
            </label>
            <input
              id="readTime"
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              placeholder="e.g., 5"
              min="1"
              required
              disabled={loading}
            />
            <p className="text-sm text-gray-400">
              Estimated reading time for your content
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Blog Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogForm;
