import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectsView = ({ projects = [] }) => {
  if (projects.length === 0)
    return <p className="text-gray-400">No projects added yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-white">Projects</h2>
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-2">
        {projects.map((project, i) => (
          <motion.div
            key={project._id || i}
            className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 text-white min-h-[420px]"
            whileHover={{ scale: 1.03, y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {project.image && (
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <div className="p-8">
              <h3 className="font-bold text-xl mb-3 text-white">{project.title}</h3>
              <p className="text-gray-300 whitespace-pre-line line-clamp-4 mb-5 leading-relaxed">
                {project.description}
              </p>
              
              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs px-3 py-1.5 rounded-full border border-blue-400/20 backdrop-blur-sm"
                    >
                      {tech.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex space-x-6 mt-auto pt-4 border-t border-white/10">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                    title="GitHub Repository"
                  >
                    <FaGithub size={22} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;