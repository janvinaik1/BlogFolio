import React from "react";

export default function ExperienceForm({
  experience,
  handleChange,
  addField,
  removeField,
  isActive,
}) {
  return (
    <div className={isActive ? "block" : "hidden"}>
      <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Work Experience</h3>
        <div className="space-y-6">
          {experience.map((exp, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative"
            >
              <h4 className="font-medium text-lg text-white mb-3">
                {exp.company || `Experience ${idx + 1}`}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Company</label>
                  <input
                    placeholder="Company Name"
                    value={exp.company}
                    onChange={(e) => handleChange(e, idx, "company", "experience")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Position</label>
                  <input
                    placeholder="Job Title"
                    value={exp.position}
                    onChange={(e) => handleChange(e, idx, "position", "experience")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1 text-sm">Duration</label>
                  <input
                    placeholder="Jan 2020 - Present"
                    value={exp.duration}
                    onChange={(e) => handleChange(e, idx, "duration", "experience")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1 text-sm">Description</label>
                  <textarea
                    placeholder="Describe your responsibilities and achievements..."
                    value={exp.description}
                    onChange={(e) => handleChange(e, idx, "description", "experience")}
                    rows="3"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField("experience", idx)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1"
                  aria-label="Remove Experience"
                >
                  <span className="text-xl">×</span>
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="mt-2 inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-blue-400 bg-gray-700 hover:bg-gray-650"
            onClick={() =>
              addField("experience", {
                company: "",
                position: "",
                duration: "",
                description: "",
              })
            }
          >
            + Add Experience
          </button>
        </div>
      </div>
    </div>
  );
}
