import { motion } from "framer-motion";
import React from "react";

interface Props {
  onClick: () => any;
}

const Backdrop: React.FC<Props> = ({ onClick, children }) => {
  return (
    <motion.div
      onClick={onClick}
      className="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
