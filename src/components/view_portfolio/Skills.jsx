import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const SkillsView = ({ skills = [] }) => {
  if (skills.length === 0)
    return <p className="text-gray-400 italic">No skills added yet.</p>;

  return (
    <motion.div
      className="px-4 py-6 rounded-xl shadow-lg bg-white/5 backdrop-blur-sm border border-white/10"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <h2 className="text-3xl font-bold mb-6 text-pink-300">Skills</h2>

      <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, i) => (
          <motion.li
            key={skill._id || i}
            className="bg-white/10 rounded-lg p-4 text-white border border-white/10 shadow hover:shadow-pink-500/20 transition-all"
            variants={itemVariants}
          >
            <p className="text-lg font-semibold">{skill.name}</p>
            <p className="text-sm text-purple-300">{skill.level}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
};

export default SkillsView;
