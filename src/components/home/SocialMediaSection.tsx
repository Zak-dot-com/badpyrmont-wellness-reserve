
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

  const socialLinks = [
    { Icon: Instagram, href: '#' },
    { Icon: Facebook, href: '#' },
    { Icon: Linkedin, href: '#' },
    { Icon: X, href: '#' },
    { Icon: Youtube, href: '#' }
  ];

  return (
    <section className="bg-black py-16">
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
              className="w-24 h-24"
            />
            <h2 className="text-white text-2xl tracking-wider">FOLLOW US</h2>
          </motion.div>
          
          <motion.div 
            className="flex justify-center space-x-8"
            variants={containerVariants}
          >
            {socialLinks.map(({ Icon, href }) => (
              <motion.div
                key={href}
                variants={itemVariants}
                whileHover={{ scale: 1.2 }}
              >
                <Link to={href}>
                  <Icon 
                    className="text-white w-8 h-8 hover:text-gray-300 transition-all duration-300" 
                  />
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
