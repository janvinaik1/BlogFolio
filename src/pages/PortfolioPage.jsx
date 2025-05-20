import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Award, Calendar, ExternalLink, Github, Phone, MapPin, Globe, Mail, GitGraph } from 'lucide-react';
import portfolioService from "../services/portfolio.services";

const PortfolioDisplay = () => {
  const { id } = useParams();
  console.log(id );
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await portfolioService.getPortfolio(id );
        setPortfolio(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to load portfolio");
        setLoading(false);
      }
    };

    if (id ) {
      fetchPortfolio();
    }
  }, [id ]);

  const getSocialIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "github":
        return <GitGraph className="w-6 h-6" />;
      case "email":
      case "mail":
        return <Mail className="w-6 h-6" />;
      default:
        return <ExternalLink className="w-6 h-6" />;
    }
  };

  const getSkillColor = (level) => {
    switch (level) {
      case "Advanced":
        return "bg-green-600";
      case "Intermediate":
        return "bg-yellow-600";
      case "Beginner":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-400 mt-4">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-gray-400 text-lg">Portfolio not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-400">
              {portfolio.name}
            </h1>
            <div className="flex space-x-6">
              <a
                href="#about"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                About
              </a>
              <a
                href="#experience"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Projects
              </a>
              <a
                href={`/public/home?authorId=${id }`}
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Blogs
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <p className="text-blue-400 text-lg mb-4">Hi, my name is</p>
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-100 mb-4">
                {portfolio.name}
              </h1>
              <h2 className="text-4xl lg:text-6xl font-bold text-gray-400 mb-6">
                {portfolio.title}
              </h2>
              <div className="flex space-x-4">
                {portfolio.socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors group"
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
                <a
                  href={`mailto:${portfolio.contactEmail}`}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors font-medium"
                >
                  Get In Touch
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-blue-400/20">
                  <img
                    src={portfolio.avatar}
                    alt={portfolio.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-400/10 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-12">About Me</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-300 leading-relaxed mb-6">
                {portfolio.bio}
              </p>

              {portfolio.education.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-400" />
                    Education
                  </h3>
                  {portfolio.education.map((edu, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 bg-gray-800 rounded-lg"
                    >
                      <h4 className="font-semibold text-white">{edu.degree}</h4>
                      <p className="text-blue-400">{edu.school}</p>
                      <p className="text-gray-400 text-sm">{edu.year}</p>
                      {edu.description && (
                        <p className="text-gray-300 mt-2">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-6">
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {portfolio.skills.map((skill, index) => (
                  <div key={index} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">
                        {skill.name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${getSkillColor(
                          skill.level
                        )}`}
                      >
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      {portfolio.experience.length > 0 && (
        <section id="experience" className="py-20 px-6 bg-gray-900/50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-400 mb-12">
              Experience
            </h2>
            <div className="space-y-8">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-lg">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {exp.position}
                      </h3>
                      <p className="text-blue-400 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-400 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>{exp.duration}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-12">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolio.projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gray-700 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-400 mb-6 text-center">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-12 text-center max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects. Feel free to reach out through any of the channels below.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="p-3 bg-gray-700 rounded-lg mr-4">
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <p className="text-white">{portfolio.contact.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-gray-700 rounded-lg mr-4">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href={`mailto:${portfolio.contact.email}`} className="text-white hover:text-blue-400 transition-colors">
                      {portfolio.contact.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-gray-700 rounded-lg mr-4">
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Address</p>
                    <p className="text-white">{portfolio.contact.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="p-3 bg-gray-700 rounded-lg mr-4">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Website</p>
                    <a 
                      href={`https://${portfolio.contact.website}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors"
                    >
                      {portfolio.contact.website}
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="text-white font-medium mb-4">Connect on Social Media</h4>
                <div className="flex space-x-4">
                  {portfolio.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors group"
                    >
                      {getSocialIcon(social.platform)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div> 
  );
};

export default PortfolioDisplay;
