import { motion } from "framer-motion";

const EducationView = ({ education = [] }) => {
  if (education.length === 0)
    return <p className="text-gray-400">No education history added yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-white">Education</h2>
      <div className="space-y-4">
        {education.map((edu, i) => (
          <motion.div
            key={i}
            className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 shadow-md hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-1">{edu.degree}</h3>
            <p className="text-gray-300">{edu.institution}</p>
            <p className="text-sm text-gray-400 mt-1">
              {edu.startDate} – {edu.endDate || "Ongoing"}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EducationView;
