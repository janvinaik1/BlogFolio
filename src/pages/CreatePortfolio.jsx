import { useState } from "react";
import portfolioService from "../services/portfolio.services";
import { useNavigate } from "react-router-dom";

const CreatePortfolioForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    avatar: "",
    contactEmail: "",
    socialLinks: [{ platform: "", link: "" }],
    skills: [{ name: "", level: "Beginner" }],
    projects: [
      {
        title: "",
        description: "",
        techStack: [""],
        githubLink: "",
        liveDemo: "",
        image: "",
      },
    ],
    experience: [{ company: "", position: "", duration: "", description: "" }],
    education: [{ school: "", degree: "", year: "", description: "" }],
  });

  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState("basic");

  const handleChange = (e, index, key, type, isArray = false) => {
    const { value } = e.target;
    const updated = [...formData[type]];
    if (isArray) {
      updated[index][key] = value.split(",").map((item) => item.trim());
    } else {
      updated[index][key] = value;
    }
    setFormData({ ...formData, [type]: updated });
  };

  const handleSimpleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addField = (type, newItem) => {
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  const removeField = (type, index) => {
    const updated = [...formData[type]];
    updated.splice(index, 1);
    setFormData({ ...formData, [type]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setError("User not found. Please log in again.");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user.id;
    console.log("Im here umm:", userId);
    try {
      const portfolioData = {
        ...formData,
        socialLinks: formData.socialLinks.filter(
          (link) => link.platform.trim() && link.link.trim()
        ),
        skills: formData.skills.filter((skill) => skill.name.trim()),
        projects: formData.projects.filter((project) => project.title.trim()),
        experience: formData.experience.filter((exp) => exp.company.trim()),
        education: formData.education.filter((edu) => edu.school.trim()),
      };
      await portfolioService.createPortfolio(portfolioData, token, userId);
      navigate(`/portfolio/${userId}`);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      setError("Failed to create portfolio. Please try again.");
    }
  };

  const sections = [
    { id: "basic", name: "Basic Info" },
    { id: "social", name: "Social Links" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "contact", name: "Contact Info" },
  ];

  return (
   <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold">
            Create Your Developer Portfolio
          </h2>
          <p className="mt-2 opacity-80">
            Showcase your skills and projects with a professional portfolio
          </p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-gray-900 p-4">
            <div className="sticky top-0">
              <ul>
                {sections.map((section) => (
                  <li key={section.id} className="mb-1">
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white font-medium"
                          : "text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {section.name}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  type="submit"
                  form="portfolio-form"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <span>Submit Portfolio</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Form Content */}
          <div className="flex-1 bg-gray-800 p-8">
            <form
              id="portfolio-form"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* BASIC INFO */}
              <div className={activeSection === "basic" ? "block" : "hidden"}>
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
                      <label className="block text-gray-300 mb-1 text-sm">
                        Bio
                      </label>
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
              </div>

              {/* CONTACT INFO */}
              <div className={activeSection === "contact" ? "block" : "hidden"}>
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Email Address
                        </label>
                        <input
                          name="email"
                          type="email"
                          value={formData.contact?.email || ''}
                          onChange={(e) => handleContactChange(e, 'email')}
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
                          value={formData.contact?.phone || ''}
                          onChange={(e) => handleContactChange(e, 'phone')}
                          placeholder="+1 (555) 123-4567"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Website URL
                        </label>
                        <input
                          name="website"
                          type="url"
                          value={formData.contact?.website || ''}
                          onChange={(e) => handleContactChange(e, 'website')}
                          placeholder="https://your-website.com"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 mb-1 text-sm">
                          Location
                        </label>
                        <input
                          name="address"
                          value={formData.contact?.address || ''}
                          onChange={(e) => handleContactChange(e, 'address')}
                          placeholder="City, State, Country"
                          className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SOCIAL LINKS */}
              <div className={activeSection === "social" ? "block" : "hidden"}>
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Social Links
                  </h3>
                  <div className="space-y-4">
                    {formData.socialLinks.map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="flex-1">
                          <input
                            placeholder="Platform (e.g. GitHub)"
                            value={item.platform}
                            onChange={(e) =>
                              handleChange(e, idx, "platform", "socialLinks")
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            placeholder="Profile Link"
                            value={item.link}
                            onChange={(e) =>
                              handleChange(e, idx, "link", "socialLinks")
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        {formData.socialLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("socialLinks", idx)}
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
                      onClick={() =>
                        addField("socialLinks", { platform: "", link: "" })
                      }
                    >
                      + Add Social Link
                    </button>
                  </div>
                </div>
              </div>

              {/* SKILLS */}
              <div className={activeSection === "skills" ? "block" : "hidden"}>
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Skills
                  </h3>
                  <div className="space-y-4">
                    {formData.skills.map((skill, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="flex-1">
                          <input
                            placeholder="Skill Name"
                            value={skill.name}
                            onChange={(e) =>
                              handleChange(e, idx, "name", "skills")
                            }
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div className="flex-1">
                          <select
                            value={skill.level}
                            onChange={(e) =>
                              handleChange(e, idx, "level", "skills")
                            }
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
                      onClick={() =>
                        addField("skills", { name: "", level: "Beginner" })
                      }
                    >
                      + Add Skill
                    </button>
                  </div>
                </div>
              </div>

              <div
                className={activeSection === "projects" ? "block" : "hidden"}
              >
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Projects
                  </h3>
                  <div className="space-y-6">
                    {formData.projects.map((proj, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative"
                      >
                        <h4 className="font-medium text-lg text-white mb-3">
                          {proj.title || `Project ${idx + 1}`}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Title
                            </label>
                            <input
                              placeholder="Project Title"
                              value={proj.title}
                              onChange={(e) =>
                                handleChange(e, idx, "title", "projects")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Tech Stack
                            </label>
                            <input
                              placeholder="React, Node.js, MongoDB"
                              value={proj.techStack.join(", ")}
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  idx,
                                  "techStack",
                                  "projects",
                                  true
                                )
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              GitHub Link
                            </label>
                            <input
                              placeholder="https://github.com/username/project"
                              value={proj.githubLink}
                              onChange={(e) =>
                                handleChange(e, idx, "githubLink", "projects")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Live Demo
                            </label>
                            <input
                              placeholder="https://project-demo.com"
                              value={proj.liveDemo}
                              onChange={(e) =>
                                handleChange(e, idx, "liveDemo", "projects")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Image URL
                            </label>
                            <input
                              placeholder="https://example.com/project-image.jpg"
                              value={proj.image}
                              onChange={(e) =>
                                handleChange(e, idx, "image", "projects")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Description
                            </label>
                            <textarea
                              placeholder="Describe your project..."
                              value={proj.description}
                              onChange={(e) =>
                                handleChange(e, idx, "description", "projects")
                              }
                              rows="3"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
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
                        })
                      }
                    >
                      + Add Project
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={activeSection === "experience" ? "block" : "hidden"}
              >
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Work Experience
                  </h3>
                  <div className="space-y-6">
                    {formData.experience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative"
                      >
                        <h4 className="font-medium text-lg text-white mb-3">
                          {exp.company || `Experience ${idx + 1}`}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Company
                            </label>
                            <input
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) =>
                                handleChange(e, idx, "company", "experience")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Position
                            </label>
                            <input
                              placeholder="Job Title"
                              value={exp.position}
                              onChange={(e) =>
                                handleChange(e, idx, "position", "experience")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Duration
                            </label>
                            <input
                              placeholder="Jan 2020 - Present"
                              value={exp.duration}
                              onChange={(e) =>
                                handleChange(e, idx, "duration", "experience")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Description
                            </label>
                            <textarea
                              placeholder="Describe your responsibilities and achievements..."
                              value={exp.description}
                              onChange={(e) =>
                                handleChange(
                                  e,
                                  idx,
                                  "description",
                                  "experience"
                                )
                              }
                              rows="3"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        {formData.experience.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("experience", idx)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1"
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

              <div
                className={activeSection === "education" ? "block" : "hidden"}
              >
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Education
                  </h3>
                  <div className="space-y-6">
                    {formData.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-4 border border-gray-600 rounded-lg bg-gray-800 relative"
                      >
                        <h4 className="font-medium text-lg text-white mb-3">
                          {edu.school || `Education ${idx + 1}`}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              School
                            </label>
                            <input
                              placeholder="University/School Name"
                              value={edu.school}
                              onChange={(e) =>
                                handleChange(e, idx, "school", "education")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-300 mb-1 text-sm">
                              Degree
                            </label>
                            <input
                              placeholder="Bachelor's in Computer Science"
                              value={edu.degree}
                              onChange={(e) =>
                                handleChange(e, idx, "degree", "education")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Year
                            </label>
                            <input
                              placeholder="2018 - 2022"
                              value={edu.year}
                              onChange={(e) =>
                                handleChange(e, idx, "year", "education")
                              }
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-gray-300 mb-1 text-sm">
                              Description
                            </label>
                            <textarea
                              placeholder="Relevant coursework, achievements, etc."
                              value={edu.description}
                              onChange={(e) =>
                                handleChange(e, idx, "description", "education")
                              }
                              rows="3"
                              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                        {formData.education.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeField("education", idx)}
                            className="absolute top-4 right-4 text-red-400 hover:text-red-300 p-1"
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
              {error && (
                <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-200">
                  {error}
                </div>
              )}
              <div className="md:hidden">
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all flex items-center justify-center"
                >
                  <span>Submit Portfolio</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioForm;
