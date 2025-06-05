
import { motion } from "framer-motion";

const ButtonLoader = () => {
  return (
    <motion.div
      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
    />
  );
};

export default ButtonLoader;
