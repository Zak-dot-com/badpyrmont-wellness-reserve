import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ArrowRight } from 'lucide-react';
import BookingBar from './BookingBar';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=1470&auto=format&fit=crop"
  ];

  const heroContent = [
    {
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop",
      title: "DISCOVER",
      subtitle: "LONGEVITY WELLNESS",
      description: "WHERE HEALTH MEETS LUXURY"
    },
    {
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop",
      title: "MINDFUL",
      subtitle: "LIVING SPACES",
      description: "EMBRACE THE JOURNEY"
    },
    {
      image: "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=1470&auto=format&fit=crop",
      title: "HOLISTIC",
      subtitle: "HEALING RETREAT",
      description: "TRANSFORM YOUR LIFE"
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const squareVariants = {
    initial: { 
      width: "100px", 
      height: "100px", 
      top: "50%", 
      left: "50%",
      x: "-50%",
      y: "-50%",
    },
    expanded: { 
      width: "100vw", 
      height: "100vh", 
      top: "0%", 
      left: "0%",
      x: "0%",
      y: "0%",
      transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 1, 
        duration: 1,
        staggerChildren: 0.2,
        delayChildren: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const textVariants = {
    enter: {
      x: 50,
      opacity: 0
    },
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.33, 1, 0.68, 1],
        staggerChildren: 0.2
      }
    },
    exit: {
      x: -50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      <motion.div 
        className="absolute bg-black overflow-hidden z-30"
        initial="initial"
        animate={isLoaded ? "expanded" : "initial"}
        variants={squareVariants}
      >
        {heroContent.map((content, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${content.image}')`
            }}
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              transition: { duration: 1.5 }
            }}
          >
            <AnimatePresence mode="wait">
              {currentSlide === index && (
                <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right">
                  <motion.div
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="space-y-2"
                  >
                    <motion.h2
                      variants={textVariants}
                      className="text-2xl md:text-3xl font-light text-white tracking-widest"
                    >
                      {content.title}
                    </motion.h2>
                    <motion.h3
                      variants={textVariants}
                      className="text-3xl md:text-4xl font-serif text-white mb-1"
                    >
                      {content.subtitle}
                    </motion.h3>
                    <motion.p
                      variants={textVariants}
                      className="text-sm md:text-base font-light text-white tracking-[0.2em]"
                    >
                      {content.description}
                    </motion.p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      <div className="absolute inset-0 bg-black/20 z-10" />

      <motion.div 
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { delay: 1.5, duration: 0.8 }
        }}
      >
        <div className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-none">
          <div>LAN</div>
          <div>SER</div>
          <div>HOF</div>
        </div>
        
        <div className="mt-12">
          <motion.div 
            className="w-16 h-16 rounded-full border border-white mx-auto flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
            animate={{ 
              y: [0, -10, 0], 
              transition: { 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              } 
            }}
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute right-0 bottom-1/4 z-20 text-white max-w-lg px-8 md:pr-16 lg:pr-24"
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
        variants={contentVariants}
      >
        <motion.h2 
          className="text-3xl md:text-5xl font-light mb-4"
          variants={itemVariants}
        >
          WORLD'S BEST<br />LONGEVITY CLINIC
        </motion.h2>
        
        <motion.p 
          className="text-xl md:text-2xl font-light mb-8"
          variants={itemVariants}
        >
          WE ARE THE LANSERHOF.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link to="/booking">
            <Button 
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black transition-colors rounded-none px-8 py-6"
              size="lg"
            >
              PLAN YOUR STAY
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute left-0 bottom-0 bg-slate-900/90 z-20 text-white md:w-80"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <div className="p-8">
          <div className="mb-4">
            <h3 className="text-2xl font-light mb-1">7 OVERNIGHT STAYS</h3>
            <p className="text-sm font-light">incl. medical basic package</p>
          </div>
          
          <div className="mb-4">
            <h4 className="text-lg font-light">Lanserhof Sylt</h4>
            <p className="text-sm font-light">from 6.900 EUR p.P</p>
          </div>
          
          <Link to="/booking" className="inline-block">
            <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 p-4">
        <div className="container mx-auto">
          <BookingBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
