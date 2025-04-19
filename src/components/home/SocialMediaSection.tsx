
import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Facebook, Linkedin, Youtube, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialMediaSection = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const logoVariants = {
    animate: {
      scale: [1, 1.05, 1],
      rotate: [0, 5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const socialLinks = [
    { Icon: Instagram, href: '#', label: 'Instagram' },
    { Icon: Facebook, href: '#', label: 'Facebook' },
    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
    { Icon: X, href: '#', label: 'X' },
    { Icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <section className="bg-gray-900 py-16">
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-center space-y-8">
          <motion.div className="flex items-center space-x-4">
            <motion.img
              src="/lovable-uploads/c4d377d2-a6b6-4185-9f0e-6daddccf4c78.png"
              alt="Grand Hotel Logo"
              className="w-12 h-12"
              variants={logoVariants}
              animate="animate"
            />
            <h2 className="text-white text-2xl tracking-wider">FOLLOW US</h2>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-8"
            variants={containerVariants}
          >
            {socialLinks.map(({ Icon, href, label }) => (
              <motion.div
                key={label}
                variants={itemVariants}
                whileHover={{ scale: 1.2 }}
                className="relative group"
              >
                <Link to={href}>
                  <Icon 
                    className="text-white w-6 h-6 transition-transform duration-300" 
                  />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-[#F97316] text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SocialMediaSection;
