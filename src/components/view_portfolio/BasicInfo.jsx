import { motion } from "framer-motion";

const BasicInfoView = ({ portfolio }) => {
  const blogLink = `http://localhost:5173/public/home?authorId=${portfolio._id}`;

  return (
    <section className="relative h-screen text-white overflow-hidden">
      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center h-full px-6 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Avatar */}
        <motion.div
          className="mb-10 md:mb-0 md:mr-16"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src={portfolio.avatar}
            alt={portfolio.name}
            className="w-72 h-72 rounded-full border-[6px] border-white shadow-[0_0_40px_rgba(255,255,255,0.2)] object-cover hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        {/* Info Text */}
        <div className="text-center md:text-left max-w-2xl">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight tracking-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)]"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
          >
            <span className="block">Hey, I'm</span>
            <span className="text-purple-400 inline-block">
              {portfolio.name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.1 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.h2
            className="text-xl md:text-2xl text-pink-300 mb-6 tracking-wide"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
          >
            {portfolio.title}
          </motion.h2>

          <motion.p
            className="text-lg text-gray-200 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            {portfolio.bio}
          </motion.p>

          {portfolio.showBlogs && (
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <motion.a
                href={blogLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.1 }}
              >
                View My Blogs
              </motion.a>
            </div>
          )}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 text-gray-400"
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </section>
  );
};

export default BasicInfoView;
