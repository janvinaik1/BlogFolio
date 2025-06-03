import { motion } from "framer-motion";

// Animation variants for reusability
const cardVariants = {
  hidden: { opacity: 0, x: (index) => (index % 2 === 0 ? -60 : 60), y: 20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 120, damping: 15 },
  }),
};

const nodeVariants = {
  hidden: { scale: 0, rotate: -90 },
  visible: (index) => ({
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: (index) => ({
    scaleX: 1,
    transition: { duration: 0.5, delay: index * 0.1 + 0.4 },
  }),
};

const ExperienceCard = ({ exp, index }) => {
  const isLeft = index % 2 === 0;
  const isCurrentJob = exp.duration && exp.duration.toLowerCase().includes("present");

  return (
    <motion.div
      className={`flex items-center mb-8 sm:mb-10 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      custom={index}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Experience Card */}
      <div className={`w-5/12 sm:w-5/12 ${isLeft ? "pr-6 sm:pr-8" : "pl-6 sm:pl-8"}`}>
        <motion.div
          className={`bg-gradient-to-br from-[#1a1a2e] to-[#2c2a4a] p-4 sm:p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border ${
            isCurrentJob ? "border-green-500/40" : "border-purple-700/40"
          }`}
          whileHover={{ scale: 1.02, y: -5, rotateY: isLeft ? 1 : -1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={`text-${isLeft ? "left" : "right"}`}>
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <h3 className="text-lg sm:text-xl font-semibold text-purple-300">{exp.position}</h3>
              {isCurrentJob && (
                <motion.span
                  className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Current
                </motion.span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-medium text-pink-400 mb-2">{`@ ${exp.company}`}</h4>
            <motion.p
              className="text-xs sm:text-sm text-purple-200 bg-purple-900/20 px-2 py-1 rounded-full inline-block mb-2 sm:mb-3"
              whileHover={{ scale: 1.03 }}
            >
              {exp.duration}
            </motion.p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {exp.description || "No description provided."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="relative z-10">
        <motion.div
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-md border-2 border-white ${
            isCurrentJob ? "bg-green-500 shadow-green-400/40" : "bg-purple-600 shadow-purple-400/40"
          }`}
          variants={nodeVariants}
          initial="hidden"
          whileInView="visible"
          custom={index}
          whileHover={{ scale: 1.3, rotate: 180, transition: { duration: 0.3 } }}
        />
        <motion.div
          className={`absolute top-1/2 w-6 sm:w-7 h-0.5 bg-gradient-to-${isLeft ? "r" : "l"} ${
            isCurrentJob ? "from-green-500 to-transparent" : "from-purple-500 to-transparent"
          } ${isLeft ? "left-2 sm:left-2.5" : "right-2 sm:right-2.5"} -translate-y-1/2`}
          variants={lineVariants}
          initial="hidden"
          whileInView="visible"
          custom={index}
        />
      </div>

      {/* Empty space for alternating layout */}
      <div className="w-5/12 sm:w-5/12"></div>
    </motion.div>
  );
};

const ExperienceView = ({ experience = [] }) => {
  if (experience.length === 0)
    return (
      <p className="text-center text-gray-400 text-sm sm:text-base py-10">
        No work experience added yet.
      </p>
    );

  // Sort experiences by date (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    const getYear = (dateStr) => {
      if (!dateStr) return 0;
      const match = dateStr.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };

    const aYear = getYear(a.duration);
    const bYear = getYear(b.duration);

    if (a.duration && a.duration.toLowerCase().includes("present")) return -1;
    if (b.duration && b.duration.toLowerCase().includes("present")) return 1;

    return bYear - aYear;
  });

  return (
    <section className="text-white py-12 sm:py-16 px-4 sm:px-6 ">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-center text-white drop-shadow-md"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Professional Experience
        </motion.h2>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 h-full rounded-full shadow-md shadow-purple-500/20"></div>

          {sortedExperience.map((exp, i) => (
            <ExperienceCard key={exp._id || i} exp={exp} index={i} />
          ))}

          <motion.div
            className="flex justify-center mt-6"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: sortedExperience.length * 0.1, type: "spring", stiffness: 150 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-md shadow-pink-400/40"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 8px rgba(236, 72, 153, 0.4)",
                  "0 0 12px rgba(236, 72, 153, 0.6)",
                  "0 0 8px rgba(236, 72, 153, 0.4)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceView;