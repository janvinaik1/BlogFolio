import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import portfolioService from "../services/portfolio.services";

import BasicInfoView from "../components/view_portfolio/BasicInfo";
import ContactAndSocialView from "../components/view_portfolio/ContactInfo";
import SkillsView from "../components/view_portfolio/Skills";
import ProjectsView from "../components/view_portfolio/Project";
import EducationView from "../components/view_portfolio/Education";
import ExperienceView from "../components/view_portfolio/Expericence";
import BlogLinkView from "../components/view_portfolio/Blog";


const ViewPortfolio = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    // Mouse tracking
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!portfolio) return <p className="text-gray-500">Loading portfolio...</p>;

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#0b0c1a] via-[#1a1a2e] to-[#121212] text-white overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 border-2 border-purple-400 rounded-full pointer-events-none z-40"
        style={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
        }}
        animate={{
          scale: isHovering ? 1.8 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.8,
        }}
      />

      {/* Mouse Follow Gradient Blob */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-gradient-to-r from-purple-600/20 via-pink-500/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none z-5"
        style={{
          x: mousePosition.x - 192,
          y: mousePosition.y - 192,
        }}
        animate={{
          scale: isHovering ? 1.2 : 0.8,
          opacity: isHovering ? 0.6 : 0.3,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 2,
        }}
      />

      {/* Static Glowing Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700 opacity-20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-500 opacity-20 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Interactive Floating Particles */}
      <motion.div
        className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-40 pointer-events-none z-10"
        style={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      />
      <motion.div
        className="absolute w-1 h-1 bg-pink-400 rounded-full opacity-60 pointer-events-none z-10"
        style={{
          x: mousePosition.x * 0.05 + 100,
          y: mousePosition.y * 0.05 + 50,
        }}
        transition={{ type: "spring", stiffness: 80, damping: 8 }}
      />
      <motion.div
        className="absolute w-3 h-3 bg-blue-400 rounded-full opacity-30 pointer-events-none z-10"
        style={{
          x: mousePosition.x * 0.08 - 50,
          y: mousePosition.y * 0.08 + 200,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 12 }}
      />

      {/* Main Content */}
      <div className="relative z-20 px-6 py-12 max-w-7xl mx-auto space-y-20 scroll-smooth">
        <motion.section 
          id="basic"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <BasicInfoView portfolio={portfolio} />
        </motion.section>
        
        <motion.section 
          id="experience"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ExperienceView experience={portfolio.experience} />
        </motion.section>
        
        <motion.section 
          id="skills"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <SkillsView skills={portfolio.skills} />
        </motion.section>
        
        <motion.section 
          id="projects"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ProjectsView projects={portfolio.projects} />
        </motion.section>
        
        <motion.section 
          id="education"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <EducationView education={portfolio.education} />
        </motion.section>
        
        {portfolio.wantsBlog === "yes" && (
          <motion.section 
            id="blog"
            onHoverStart={() => setIsHovering(true)}
            onHoverEnd={() => setIsHovering(false)}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <BlogLinkView />
          </motion.section>
        )}
        
        <motion.section 
          id="contact"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <ContactAndSocialView contact={portfolio.contact} socialLinks={portfolio.socialLinks} />
        </motion.section>
      </div>
    </section>
  );
};

export default ViewPortfolio;