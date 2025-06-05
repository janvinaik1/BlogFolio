import { useState } from "react";
import portfolioService from "../services/portfolio.services";
import { useNavigate } from "react-router-dom";
import BasicInfoForm from "../components/create_portfolio/BasicInfo";
import ContactAndSocialForm from "../components/create_portfolio/ContactandSocialLinks";
import SkillsSection from "../components/create_portfolio/Skills";
import ProjectsSection from "../components/create_portfolio/Project";
import EducationForm from "../components/create_portfolio/Education";
import ExperienceForm from "../components/create_portfolio/Exprience";

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
    contact: {
      email: "",
      phone: "",
      website: "",
      address: "",
    },
    wantsBlog: false,
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

  const handleContactChange = (e, key) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      contact: {
        ...prevFormData.contact,
        [key]: value,
      },
    }));
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
    try {
      const portfolioData = {
        ...formData,

        socialLinks: Array.isArray(formData.socialLinks)
          ? formData.socialLinks.filter(
              (link) => link.platform?.trim() && link.link?.trim()
            )
          : [],

        skills: Array.isArray(formData.skills)
          ? formData.skills.filter((skill) => skill.name?.trim())
          : [],

        projects: Array.isArray(formData.projects)
          ? formData.projects.filter((project) => project.title?.trim())
          : [],

        experience: Array.isArray(formData.experience)
          ? formData.experience.filter((exp) => exp.company?.trim())
          : [],

        education: Array.isArray(formData.education)
          ? formData.education.filter((edu) => edu.school?.trim())
          : [],

        contact: Array.isArray(formData.contact)
          ? formData.contact.filter(
              (contact) =>
                contact.phone?.trim() ||
                contact.address?.trim() ||
                contact.website?.trim() ||
                contact.email?.trim()
            )
          : [],

        showBlogs: formData.wantsBlog === true,
      };

      
      await portfolioService.createPortfolio(portfolioData, token, userId);
      navigate(`/view/portfolio/${userId}`);
    } catch (error) {
      console.error("Error creating portfolio:", error);
      setError("Failed to create portfolio. Please try again.");
    }
  };

  const sections = [
    { id: "basic", name: "Basic Info" },
    { id: "skills", name: "Skills" },
    { id: "projects", name: "Projects" },
    { id: "experience", name: "Experience" },
    { id: "education", name: "Education" },
    { id: "contact", name: "Contact Info" },
    { id: "blogs", name: "Blogs" },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <h2 className="text-3xl font-bold">Create Your Portfolio</h2>
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

          <div className="flex-1 bg-gray-800 p-8">
            <form
              id="portfolio-form"
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* BASIC INFO */}
              {activeSection === "basic" && (
                <BasicInfoForm
                  formData={formData}
                  handleSimpleChange={handleSimpleChange}
                />
              )}

              {/* CONTACT INFO */}
              {activeSection === "contact" && (
                <ContactAndSocialForm
                  formData={formData}
                  handleContactChange={handleContactChange}
                  handleChange={handleChange}
                  addField={addField}
                  removeField={removeField}
                />
              )}

              {/* SKILLS */}
              <SkillsSection
                activeSection={activeSection}
                formData={formData}
                handleChange={handleChange}
                addField={addField}
                removeField={removeField}
              />
              {/* Projects*/}
              <ProjectsSection
                activeSection={activeSection}
                formData={formData}
                handleChange={handleChange}
                addField={addField}
                removeField={removeField}
              />

              <ExperienceForm
                experience={formData.experience}
                handleChange={handleChange}
                addField={addField}
                removeField={removeField}
                isActive={activeSection === "experience"}
              />

              <EducationForm
                education={formData.education}
                handleChange={handleChange}
                addField={addField}
                removeField={removeField}
                isActive={activeSection === "education"}
              />
              {activeSection === "blogs" && (
                <div className="bg-gray-750 rounded-xl p-6 border border-gray-700 mb-6">
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Do you have a blog page?
                  </h3>
                  <div className="flex items-center space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wantsBlog"
                        checked={formData.wantsBlog === true}
                        onChange={() =>
                          setFormData({ ...formData, wantsBlog: true })
                        }
                        className="form-radio text-blue-500 bg-gray-700 border-gray-600"
                      />
                      <span className="ml-2 text-white">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="wantsBlog"
                        checked={formData.wantsBlog === false}
                        onChange={() =>
                          setFormData({ ...formData, wantsBlog: false })
                        }
                        className="form-radio text-blue-500 bg-gray-700 border-gray-600"
                      />
                      <span className="ml-2 text-white">No</span>
                    </label>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioForm;
