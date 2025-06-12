import { motion } from "framer-motion";

const EducationView = ({ education = [] }) => {
  if (education.length === 0)
    return (
      <motion.div 
        className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-gray-400 text-sm">No education history added yet.</p>
      </motion.div>
    );

  return (
    <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-white/10 rounded-xl shadow-xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10">
        <motion.h2 
          className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Education
        </motion.h2>
      </div>
      
      <div className="divide-y divide-white/5">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            className="px-6 py-4 hover:bg-white/5 transition-all duration-300 group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            whileHover={{ x: 2 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-white truncate group-hover:text-emerald-300 transition-colors duration-300">
                    {edu.school}
                  </h3>
                  <span className="text-xs text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-2 py-1 rounded-full whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
                
                <p className="text-sm text-gray-300 mb-2 group-hover:text-gray-200 transition-colors duration-300">
                  {edu.degree}
                </p>
                
                {edu.description && (
                  <p className="text-xs text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {edu.description}
                  </p>
                )}
              </div>
              
              <motion.div 
                className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 + 0.2 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )};
export default EducationView;
