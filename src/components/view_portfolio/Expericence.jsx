import { motion } from "framer-motion";

const ExperienceView = ({ experience = [] }) => {
  if (experience.length === 0) return <p className="text-center text-gray-400">No work experience added yet.</p>;

  // Sort experiences by date (most recent first)
  const sortedExperience = [...experience].sort((a, b) => {
    const getYear = (dateStr) => {
      if (!dateStr) return 0;
      const match = dateStr.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    
    const aYear = getYear(a.duration);
    const bYear = getYear(b.duration);
    
    // If duration contains "Present", it should be first
    if (a.duration && a.duration.toLowerCase().includes('present')) return -1;
    if (b.duration && b.duration.toLowerCase().includes('present')) return 1;
    
    return bYear - aYear;
  });

  return (
    <section className="text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Professional Experience
        </motion.h2>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-700 h-full rounded-full shadow-lg shadow-purple-500/30"></div>

          {sortedExperience.map((exp, i) => {
            const isLeft = i % 2 === 0;
            const isCurrentJob = exp.duration && exp.duration.toLowerCase().includes('present');
            
            return (
              <motion.div
                key={exp._id || i}
                className={`flex items-center mb-16 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: isLeft ? -80 : 80, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              >
                {/* Experience Card */}
                <div className={`w-5/12 ${isLeft ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className={`bg-gradient-to-br from-[#1c1b2f] to-[#2a2847] p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border ${
                      isCurrentJob 
                        ? 'border-green-500/50 hover:shadow-green-500/20' 
                        : 'border-purple-800/30 hover:shadow-purple-500/20'
                    }`}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -8,
                      rotateY: isLeft ? 2 : -2,
                      rotateX: 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <div className={`text-${isLeft ? 'left' : 'right'}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-purple-300">
                          {exp.position}
                        </h3>
                        {isCurrentJob && (
                          <motion.span 
                            className="text-xs bg-green-500 text-white px-2 py-1 rounded-full"
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            Current
                          </motion.span>
                        )}
                      </div>
                      <h4 className="text-lg font-semibold text-pink-400 mb-3">
                        @ {exp.company}
                      </h4>
                      <motion.p 
                        className="text-sm text-purple-200 bg-purple-900/30 px-3 py-1 rounded-full inline-block mb-4"
                        whileHover={{ scale: 1.05 }}
                      >
                        {exp.duration}
                      </motion.p>
                      <p className="text-gray-300 leading-relaxed">
                        {exp.description || "No description provided."}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-6 h-6 rounded-full shadow-lg border-4 border-white ${
                      isCurrentJob 
                        ? 'bg-gradient-to-r from-green-400 to-green-600 shadow-green-400/50' 
                        : 'bg-gradient-to-r from-pink-500 to-purple-600 shadow-pink-400/50'
                    }`}
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6, 
                      delay: i * 0.15 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ 
                      scale: 1.4,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  />
                  
                  {/* Connecting Line to Card */}
                  <motion.div 
                    className={`absolute top-1/2 w-8 h-0.5 bg-gradient-to-${isLeft ? 'r' : 'l'} ${
                      isCurrentJob 
                        ? 'from-green-500 to-transparent' 
                        : 'from-purple-500 to-transparent'
                    } ${isLeft ? 'left-3' : 'right-3'} -translate-y-1/2`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.6 }}
                  />
                </div>

                {/* Empty space for alternating layout */}
                <div className="w-5/12"></div>
              </motion.div>
            );
          })}

          {/* Timeline End Decoration */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8, 
              delay: sortedExperience.length * 0.15,
              type: "spring",
              stiffness: 150
            }}
          >
            <motion.div 
              className="w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg shadow-pink-400/50"
              animate={{ 
                boxShadow: [
                  "0 0 10px rgba(236, 72, 153, 0.5)",
                  "0 0 20px rgba(236, 72, 153, 0.8)",
                  "0 0 10px rgba(236, 72, 153, 0.5)"
                ]
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