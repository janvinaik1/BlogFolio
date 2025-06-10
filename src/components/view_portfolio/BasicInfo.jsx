import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaGlobe,
} from "react-icons/fa";

// Icons mapped from URL
const getIconForPlatform = (url = "") => {
  const domain = url.toLowerCase();
  if (domain.includes("github.com")) return <FaGithub />;
  if (domain.includes("linkedin.com")) return <FaLinkedin />;
  if (domain.includes("twitter.com")) return <FaTwitter />;
  if (domain.includes("instagram.com")) return <FaInstagram />;
  return <FaGlobe />;
};

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.2 },
  },
};

const avatarVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.4 } },
};

const getTextVariants = (delay = 0) => ({
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, delay, ease: "easeOut" },
  },
});

const scrollIndicatorVariants = {
  animate: {
    y: [0, 15, 0],
    opacity: [0.6, 1, 0.6],
    transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
  },
};

// Avatar
const Avatar = ({ src, alt }) => (
  <motion.div
    className="mb-10 sm:mb-12 md:mb-0 md:mr-12 lg:mr-16 flex-shrink-0"
    variants={avatarVariants}
    initial="hidden"
    animate="visible"
  >
    <img
      src={src}
      alt={alt}
      className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full border-4 border-white shadow-2xl object-cover transform hover:scale-105 transition-transform duration-300"
    />
  </motion.div>
);

// Animated Name
const AnimatedName = ({ name = "" }) => (
  <span className="text-purple-400 inline-block">
    {name.split("").map((char, i) => (
      <motion.span
        key={i}
        animate={{ y: [0, -8, 0], opacity: [1, 0.7, 1] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          delay: i * 0.15,
          ease: "easeInOut",
        }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ))}
  </span>
);

// Social Links
const SocialLinks = ({ socialLinks = [] }) => (
  <motion.div
    className="flex gap-4 sm:gap-5 justify-center md:justify-start mb-6 sm:mb-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.8 }}
  >
    {socialLinks.map((item, index) => (
      <a
        key={index}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-purple-300 text-xl sm:text-2xl transition-transform duration-300 hover:scale-110"
        title={item.platform}
      >
        {getIconForPlatform(item.link)}
      </a>
    ))}
  </motion.div>
);

// Action Buttons
const ActionButtons = ({ portfolio, scrollToContact }) => {
  const blogLink = `https://personal-blog-portfolio-frontend.vercel.app/public/home?authorId=${portfolio?.user?._id}`;

  return (
    <motion.div
      className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.4 }}
    >
      {portfolio?.showBlogs && (
        <a
          href={blogLink}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View My Blogs
        </a>
      )}
      <button
        onClick={scrollToContact}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-pink-700 hover:from-pink-600 hover:to-pink-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Contact Me
      </button>
    </motion.div>
  );
};

// Scroll Indicator
const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-gray-300"
    variants={scrollIndicatorVariants}
    animate="animate"
  >
    <svg
      className="w-6 h-6 sm:w-8 sm:h-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" d="M19 9l-7 7-7-7" />
    </svg>
  </motion.div>
);

// Main Component
const BasicInfoView = ({ portfolio = {} }) => {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Avatar src={portfolio.avatar} alt={portfolio.name || "Avatar"} />
        <div className="text-center md:text-left max-w-md sm:max-w-lg md:max-w-xl">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-lg"
            variants={getTextVariants(0.6)}
            initial="hidden"
            animate="visible"
          >
            Hey, I'm <AnimatedName name={portfolio.name} />
          </motion.h1>
          <motion.h2
            className="text-lg sm:text-xl md:text-2xl text-pink-300 mb-4 sm:mb-6 font-medium tracking-wide"
            variants={getTextVariants(0.8)}
            initial="hidden"
            animate="visible"
          >
            {portfolio.title}
          </motion.h2>
          <motion.p
            className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed mb-6 sm:mb-8 max-w-prose"
            variants={getTextVariants(1.0)}
            initial="hidden"
            animate="visible"
          >
            {portfolio.bio}
          </motion.p>
          {Array.isArray(portfolio.socialLinks) && portfolio.socialLinks.length > 0 && (
            <SocialLinks socialLinks={portfolio.socialLinks} />
          )}
          <ActionButtons portfolio={portfolio} scrollToContact={scrollToContact} />
        </div>
      </motion.div>
      <ScrollIndicator />
    </section>
  );
};

export default BasicInfoView;
