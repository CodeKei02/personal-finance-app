import { motion } from "framer-motion";
import { MotionProps } from "./types";

export const Motion: React.FC<MotionProps> = ({ children, card, index, style = {} }) => {
  return (
    <motion.div
      key={card}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={style}
    >
      {children}
    </motion.div>
  );
};
