const ProjectsSection = ({ activeSection, formData, handleChange, addField, removeField }) => {
  if (activeSection !== "projects") return null;

  const handleProjectImageChange = (e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      console.log("Uploading file for project:", idx, file);
      handleChange({ target: { value: file } }, idx, "image", "projects");
      handleChange({ target: { value: objectUrl } }, idx, "imagePreview", "projects");
    }
  };

  const handleProjectImageUrlChange = (e, idx) => {
    const value = e.target.value;
    handleChange({ target: { value } }, idx, "image", "projects");
    handleChange({ target: { value: "" } }, idx, "imagePreview", "projects"); // Reset preview
  };

  return (
    <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-white mb-4">Projects</h3>
      <div className="space-y-6">
        {formData.projects.map((proj, idx) => (
          <div key={idx} className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative">
            <h4 className="font-medium text-lg text-white mb-3">
              {proj.title || `Project ${idx + 1}`}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Title</label>
                <input
                  placeholder="Project Title"
                  value={proj.title}
                  onChange={(e) => handleChange(e, idx, "title", "projects")}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Tech Stack</label>
                <input
                  placeholder="React, Node.js, MongoDB"
                  value={proj.techStack.join(", ")}
                  onChange={(e) => handleChange(e, idx, "techStack", "projects", true)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* GitHub Link */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm">GitHub Link</label>
                <input
                  placeholder="https://github.com/username/project"
                  value={proj.githubLink}
                  onChange={(e) => handleChange(e, idx, "githubLink", "projects")}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Live Demo */}
              <div>
                <label className="block text-gray-300 mb-1 text-sm">Live Demo</label>
                <input
                  placeholder="https://project-demo.com"
                  value={proj.liveDemo}
                  onChange={(e) => handleChange(e, idx, "liveDemo", "projects")}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Project Image */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Project Image (URL or Upload)</label>
                <input
                  type="text"
                  placeholder="https://example.com/project-image.jpg"
                  value={typeof proj.image === "string" ? proj.image : ""}
                  onChange={(e) => handleProjectImageUrlChange(e, idx)}
                  className="w-full mb-2 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleProjectImageChange(e, idx)}
                  className="w-full text-sm text-white bg-gray-700 rounded-lg border border-gray-600 file:bg-blue-500 file:text-white file:px-3 file:py-1 file:rounded file:border-none"
                />
                {(proj.imagePreview || (typeof proj.image === "string" && proj.image)) && (
                  <img
                    src={proj.imagePreview || proj.image}
                    alt="Preview"
                    className="mt-2 w-full max-w-xs h-auto rounded border border-gray-500"
                  />
                )}
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Description</label>
                <textarea
                  placeholder="Describe your project..."
                  value={proj.description}
                  onChange={(e) => handleChange(e, idx, "description", "projects")}
                  rows="3"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Features */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Features</label>
                <textarea
                  placeholder="JWT Auth, Admin Dashboard, Cart System"
                  value={proj.features?.join(", ")}
                  onChange={(e) => handleChange(e, idx, "features", "projects", true)}
                  rows="2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Architecture */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Architecture</label>
                <textarea
                  placeholder="Frontend in React, Backend in Node.js + Express, DB in MongoDB"
                  value={proj.architecture}
                  onChange={(e) => handleChange(e, idx, "architecture", "projects")}
                  rows="2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Challenges */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Challenges</label>
                <textarea
                  placeholder="Describe problems faced or interesting learnings..."
                  value={proj.challenges}
                  onChange={(e) => handleChange(e, idx, "challenges", "projects")}
                  rows="2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Future Plans */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Future Plans</label>
                <textarea
                  placeholder="Describe any planned improvements..."
                  value={proj.futurePlans}
                  onChange={(e) => handleChange(e, idx, "futurePlans", "projects")}
                  rows="2"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>

              {/* Duration */}
              <div className="md:col-span-2">
                <label className="block text-gray-300 mb-1 text-sm">Duration</label>
                <input
                  placeholder="2 months"
                  value={proj.duration}
                  onChange={(e) => handleChange(e, idx, "duration", "projects")}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
              </div>
            </div>

            {/* Remove Project */}
            {formData.projects.length > 1 && (
              <button
                type="button"
                onClick={() => removeField("projects", idx)}
                className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1"
              >
                <span className="text-xl">×</span>
              </button>
            )}
          </div>
        ))}

        {/* Add Project */}
        <button
          type="button"
          className="mt-2 inline-flex items-center px-4 py-2 border border-gray-600 rounded-lg text-sm font-medium text-blue-400 bg-gray-700 hover:bg-gray-650"
          onClick={() =>
            addField("projects", {
              title: "",
              description: "",
              techStack: [""],
              githubLink: "",
              liveDemo: "",
              image: "",
              imagePreview: "",
              features: [""],
              architecture: "",
              challenges: "",
              futurePlans: "",
              duration: ""
            })
          }
        >
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectsSection;
