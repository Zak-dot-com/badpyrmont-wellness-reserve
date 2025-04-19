
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MegaMenuProps {
  onClose: () => void;
}

const MegaMenu = ({ onClose }: MegaMenuProps) => {
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
      className="fixed inset-0 bg-slate-900 text-white z-50"
    >
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-end mb-8">
          <button
            onClick={onClose}
            className="text-white hover:opacity-80 transition-opacity"
          >
            <X size={32} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-12">
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-light mb-6">ABOUT</h3>
            <Link to="/concept" className="block text-lg hover:opacity-80">Concept</Link>
            <Link to="/health-guide" className="block text-lg hover:opacity-80">Health Guide</Link>
            <Link to="/packages" className="block text-lg hover:opacity-80">Packages</Link>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-light mb-6">LOCATIONS</h3>
            <Link to="/locations/lans" className="block text-lg hover:opacity-80">Lans</Link>
            <Link to="/locations/tegernsee" className="block text-lg hover:opacity-80">Tegernsee</Link>
            <Link to="/locations/sylt" className="block text-lg hover:opacity-80">Sylt</Link>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl font-light mb-6">CONTACT</h3>
            <p className="text-lg">info@lanserhof.com</p>
            <p className="text-lg">+43 512 38666 0</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default MegaMenu;
