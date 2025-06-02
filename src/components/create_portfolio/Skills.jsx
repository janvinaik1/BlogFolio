import React from "react";

const SkillsSection = ({ activeSection, formData, handleChange, addField, removeField }) => {
  if (activeSection !== "skills") return null;

  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
      <div className="space-y-4">
        {formData.skills.map((skill, idx) => (
          <div key={idx} className="flex gap-3 items-center">
            <div className="flex-1">
              <input
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => handleChange(e, idx, "name", "skills")}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex-1">
              <select
                value={skill.level}
                onChange={(e) => handleChange(e, idx, "level", "skills")}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>
            {formData.skills.length > 1 && (
              <button
                type="button"
                onClick={() => removeField("skills", idx)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="mt-2 inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-blue-400 bg-gray-700 hover:bg-gray-650"
          onClick={() => addField("skills", { name: "", level: "Beginner" })}
        >
          + Add Skill
        </button>
      </div>
    </div>
  );
};

export default SkillsSection;
