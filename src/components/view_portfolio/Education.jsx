import { motion } from "framer-motion";

const EducationView = ({ education = [] }) => {
  if (education.length === 0)
    return (
      <motion.div 
        className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-gray-400 text-lg">No education history added yet.</p>
      </motion.div>
    );

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
      <motion.h2 
        className="text-2xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Education
      </motion.h2>
      
      <div className="space-y-6 relative">
        {/* Timeline line */}
        
        
        {education.map((edu, i) => (
          <motion.div
            key={i}
            className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:bg-gradient-to-br hover:from-white/15 hover:to-white/8 group"
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ 
              delay: i * 0.15, 
              duration: 0.6,
              type: "spring",
              stiffness: 100 
            }}
            whileHover={{ 
              y: -5,
              transition: { type: "spring", stiffness: 300 }
            }}
          >

            
            {/* Degree with animation */}
            <motion.h3 
              className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.2 }}
            >
              {edu.degree}
            </motion.h3>
            
            {/* Institution with gradient effect */}
            <motion.p 
              className="text-gray-300 text-lg mb-3 group-hover:text-white transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.3 }}
            >
              {edu.institution}
            </motion.p>
            
            {/* Date range with enhanced styling */}
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.4 }}
            >
              <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-3 py-1 rounded-full border border-emerald-400/30">
                <p className="text-sm text-emerald-300 font-medium">
                  {edu.startDate} – {edu.endDate || "Ongoing"}
                </p>
              </div>
              
              {!edu.endDate && (
                <motion.div 
                  className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-2 py-1 rounded-full border border-amber-400/30"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="text-xs text-amber-300 font-semibold">
                    Current
                  </span>
                </motion.div>
              )}
            </motion.div>
            
            {/* Decorative corner accent */}
            <motion.div 
              className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-2 bg-gradient-to-br from-emerald-400/20 to-cyan-400/20 rounded-full" />
            </motion.div>
            
            {/* Hover glow effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-cyan-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              initial={false}
            />
          </motion.div>
        ))}
      </div>
      
    </div>
  );
};

export default EducationView;