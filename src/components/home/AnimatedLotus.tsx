
import React from 'react';
import { motion } from 'framer-motion';
import { Flower2 } from 'lucide-react';

const AnimatedLotus = () => {
  const petalVariants = {
    open: {
      scale: 1.2,
      rotate: 45,
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    closed: {
      scale: 1,
      rotate: 0
    }
  };

  return (
    <motion.div
      className="w-16 h-16 rounded-full border-2 border-white mx-auto flex items-center justify-center cursor-pointer hover:border-amber-300 transition-colors duration-300"
      initial="closed"
      animate="open"
      whileHover={{ scale: 1.1 }}
    >
      <motion.div variants={petalVariants}>
        <Flower2 className="w-8 h-8 text-white hover:text-amber-300 transition-colors duration-300" />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLotus;
