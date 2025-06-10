
const ContactAndSocialForm = ({
  formData,
  handleContactChange,
  handleChange,
  addField,
  removeField,
}) => {
  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-6">
        Contact & Social Links
      </h3>

      {/* Contact Info */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={formData.contact?.email || ""}
              onChange={(e) => handleContactChange(e, "email")}
              placeholder="your.email@example.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.contact?.phone || ""}
              onChange={(e) => handleContactChange(e, "phone")}
              placeholder="+1 (555) 123-4567"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Website</label>
            <input
              name="website"
              type="url"
              value={formData.contact?.website || ""}
              onChange={(e) => handleContactChange(e, "website")}
              placeholder="https://your-website.com"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1 text-sm">Location</label>
            <input
              name="address"
              value={formData.contact?.address || ""}
              onChange={(e) => handleContactChange(e, "address")}
              placeholder="City, State, Country"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h4 className="text-lg font-medium text-white mb-4">Social Links</h4>
        <div className="space-y-4">
          {formData.socialLinks.map((item, idx) => (
            <div key={idx} className="flex gap-3 items-center">
              <input
                placeholder="Platform (e.g. GitHub)"
                value={item.platform}
                onChange={(e) => handleChange(e, idx, "platform", "socialLinks")}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                placeholder="Profile Link"
                value={item.link}
                onChange={(e) => handleChange(e, idx, "link", "socialLinks")}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.socialLinks.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField("socialLinks", idx)}
                  className="text-red-400 hover:text-red-300 p-2"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-blue-400 bg-gray-700 hover:bg-gray-650"
            onClick={() => addField("socialLinks", { platform: "", link: "" })}
          >
            + Add Social Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactAndSocialForm;
