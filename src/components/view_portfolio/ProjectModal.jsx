import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-800 text-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 p-6 relative overflow-y-auto max-h-[90vh]"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          >
            <FaTimes />
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

          {/* Image */}
          {project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />
          )}

          {/* Description */}
          <div className="mb-4">
            <h4 className="text-lg font-semibold mb-1">Description</h4>
            <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
          </div>

          {/* Features */}
          {project.features?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Features</h4>
              <ul className="list-disc list-inside text-gray-300">
                {project.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs border border-blue-400/30"
                  >
                    {tech.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Architecture</h4>
              <p className="text-gray-300 whitespace-pre-line">{project.architecture}</p>
            </div>
          )}

          {/* Challenges */}
          {project.challenges && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Challenges</h4>
              <p className="text-gray-300 whitespace-pre-line">{project.challenges}</p>
            </div>
          )}

          {/* Future Plans */}
          {project.futurePlans && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Future Plans</h4>
              <p className="text-gray-300 whitespace-pre-line">{project.futurePlans}</p>
            </div>
          )}

          {/* Duration */}
          {project.duration && (
            <div className="mb-4">
              <h4 className="text-lg font-semibold mb-1">Duration</h4>
              <p className="text-gray-300">{project.duration}</p>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-6 mt-6 border-t border-white/10 pt-4">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
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
              >
                <FaExternalLinkAlt size={20} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Demo</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
