
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.4 });
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 text-white bg-cover bg-center relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1470&auto=format&fit=crop')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase mb-6">
            Begin Your Wellness Journey
          </h2>
          
          <div className="w-24 h-0.5 bg-white mx-auto my-8"></div>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto font-light">
            Experience the transformative power of our holistic wellness approach in the serene setting of Bad Pyrmont.
          </p>
          
          <Link to="/booking">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-opacity-90 px-12 py-6 rounded-none text-base tracking-wide"
            >
              Reserve Your Stay
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
