import { motion } from 'framer-motion';
import React from 'react'
type NavChildProps = {
    isVisible: boolean;
  };
  
const NavChild :React.FC<NavChildProps> = ({isVisible}) => {
    return (
        <motion.div
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -10 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}  // Increased duration
          className="absolute  right-0 w-full p-4 bg-blue-500 text-white rounded-md"
        >
          This is a hover div!
        </motion.div>
      );
}

export default NavChild