import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import portfolioService from "../services/portfolio.services";

import BasicInfoView from "../components/view_portfolio/BasicInfo";
import ContactAndSocialView from "../components/view_portfolio/ContactInfo";
import SkillsView from "../components/view_portfolio/Skills";
import ProjectsView from "../components/view_portfolio/Project";
import ProjectModal from "../components/view_portfolio/ProjectModal";
import EducationView from "../components/view_portfolio/Education";
import ExperienceView from "../components/view_portfolio/Expericence";
import BlogLinkView from "../components/view_portfolio/Blog";

const ViewPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // NEW: to handle the modal
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { hasPortfolio, portfolio } = await portfolioService.getPortfolio(id);
        if (hasPortfolio) {
          setPortfolio(portfolio);
        } else {
          setError("Portfolio not found.");
        }
      } catch (err) {
        console.error("Failed to load portfolio", err);
        setError("Error loading portfolio.");
      }
    };
    fetchPortfolio();
  }, [id]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!portfolio) return <p className="text-gray-500">Loading portfolio...</p>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0b0c1a] via-[#1a1a2e] to-[#121212] text-white overflow-hidden scroll-smooth">
      {/* Cursor Glow */}
      <motion.div
        className="fixed w-10 h-10 rounded-full bg-white/20 blur-xl pointer-events-none z-50"
        style={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 10 }}
      />

      {/* Static Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Floating Particles */}
      <motion.div
        className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40 pointer-events-none z-10"
        style={{ x: mousePosition.x * 0.1, y: mousePosition.y * 0.1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60 pointer-events-none z-10"
        style={{ x: mousePosition.x * 0.05 + 100, y: mousePosition.y * 0.05 + 50 }}
        transition={{ type: "spring", stiffness: 80, damping: 8 }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-30 pointer-events-none z-10"
        style={{ x: mousePosition.x * 0.08 - 50, y: mousePosition.y * 0.08 + 200 }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      />

      {/* Main Content */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-12 py-12 max-w-7xl mx-auto space-y-20">
        <motion.section id="basic" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          <BasicInfoView portfolio={portfolio} />
        </motion.section>

        <motion.section id="experience" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          <ExperienceView experience={portfolio.experience} />
        </motion.section>

        <motion.section id="skills" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          <SkillsView skills={portfolio.skills} />
        </motion.section>

        <motion.section id="projects" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          {/* PASS onViewDetails to open modal */}
          <ProjectsView 
            projects={portfolio.projects}
            onViewDetails={(project) => setSelectedProject(project)}
          />
        </motion.section>

        <motion.section id="education" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          <EducationView education={portfolio.education} />
        </motion.section>

        {portfolio.wantsBlog === "yes" && (
          <motion.section id="blog" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
            <BlogLinkView />
          </motion.section>
        )}

        <motion.section id="contact" onHoverStart={() => setIsHovering(true)} onHoverEnd={() => setIsHovering(false)}>
          <ContactAndSocialView contact={portfolio.contact} socialLinks={portfolio.socialLinks} />
        </motion.section>
      </div>
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ViewPortfolio;
