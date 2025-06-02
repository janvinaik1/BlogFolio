import React from "react";

const BasicInfoForm = ({ formData, handleSimpleChange }) => {
  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">
        Personal Information
      </h3>
      <div className="space-y-4">
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
              Avatar URL
            </label>
            <input
              name="avatar"
              value={formData.avatar}
              onChange={handleSimpleChange}
              placeholder="https://example.com/avatar.jpg"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

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
