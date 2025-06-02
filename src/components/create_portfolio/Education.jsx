import React from "react";

export default function EducationForm({
  education,
  handleChange,
  addField,
  removeField,
  isActive,
}) {
  return (
    <div className={isActive ? "block" : "hidden"}>
      <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Education</h3>
        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative"
            >
              <h4 className="font-medium text-lg text-white mb-3">
                {edu.school || `Education ${idx + 1}`}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">School</label>
                  <input
                    placeholder="University/School Name"
                    value={edu.school}
                    onChange={(e) => handleChange(e, idx, "school", "education")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1 text-sm">Degree</label>
                  <input
                    placeholder="Bachelor's in Computer Science"
                    value={edu.degree}
                    onChange={(e) => handleChange(e, idx, "degree", "education")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1 text-sm">Year</label>
                  <input
                    placeholder="2018 - 2022"
                    value={edu.year}
                    onChange={(e) => handleChange(e, idx, "year", "education")}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-300 mb-1 text-sm">Description</label>
                  <textarea
                    placeholder="Relevant coursework, achievements, etc."
                    value={edu.description}
                    onChange={(e) => handleChange(e, idx, "description", "education")}
                    rows="3"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              {education.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeField("education", idx)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1"
                  aria-label="Remove Education"
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
              addField("education", {
                school: "",
                degree: "",
                year: "",
                description: "",
              })
            }
          >
            + Add Education
          </button>
        </div>
      </div>
    </div>
  );
}
