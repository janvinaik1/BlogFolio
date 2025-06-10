import { useState, useEffect } from "react";

const BasicInfoForm = ({ formData, handleSimpleChange, setFormData }) => {
  const [avatarPreview, setAvatarPreview] = useState(
    formData.avatar && typeof formData.avatar === "string" ? formData.avatar : ""
  );

  useEffect(() => {
    if (formData.avatar && typeof formData.avatar === "string") {
      setAvatarPreview(formData.avatar);
    }
  }, [formData.avatar]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
      setFormData((prev) => ({
        ...prev,
        avatar: file,
      }));
    }
  };

  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">
        Personal Information
      </h3>
      <div className="space-y-4">
        {/* Name and Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Full Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleSimpleChange}
              placeholder="John Doe"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Professional Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleSimpleChange}
              placeholder="Frontend Developer"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Email and Avatar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Contact Email
            </label>
            <input
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleSimpleChange}
              placeholder="john@example.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Upload Avatar
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded file:border-none"
            />
            {avatarPreview && avatarPreview.trim() !== "" && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full border border-gray-500"
              />
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-gray-300 mb-1 text-sm">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleSimpleChange}
            placeholder="Tell us about yourself..."
            rows="4"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
