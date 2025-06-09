import { motion } from "framer-motion";

export const Motion: React.FC<{
  children: any;
  card: any;
  index: number;
  style?: any;
}> = ({ children, card, index, style = {} }) => {
  return (
    <motion.div
      key={card.id}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={style}
    >
      {children}
    </motion.div>
  );
};
