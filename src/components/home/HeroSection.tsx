
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BookingBar from './BookingBar';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const images = [
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=1470&auto=format&fit=crop"
  ];

  // Mouse position values with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Apply spring physics for smooth following
  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform range for parallax effect
  const rotateX = useTransform(springY, [-100, 100], [5, -5]);
  const rotateY = useTransform(springX, [-100, 100], [-5, 5]);
  const translateX = useTransform(springX, [-100, 100], [15, -15]);
  const translateY = useTransform(springY, [-100, 100], [15, -15]);

  // Handle mouse move
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      className="relative h-screen overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background image carousel */}
      {images.map((img, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${img}')`
          }}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            transition: {
              duration: 1.5
            }
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Flower logo that follows mouse */}
      <motion.div
        className="absolute z-20 w-48 h-48 pointer-events-none"
        style={{
          x: translateX,
          y: translateY,
          rotateX: rotateX,
          rotateY: rotateY,
          left: '50%',
          top: '35%',
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <img 
          src="/public/lovable-uploads/7528bc75-6129-4e3b-9071-da196d1b5bc3.png" 
          alt="Wellness Flower" 
          className="w-full h-full object-contain"
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full container mx-auto px-4 py-0">
        {/* Hero text */}
        <div className="flex-grow flex flex-col justify-center items-center text-center pt-24 md:pt-28 py-[66px]">
          <motion.div 
            className="mb-6" 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              delay: 0.2
            }}
          >
            
          </motion.div>
          
          <motion.h1 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              delay: 0.3
            }} 
            className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase mb-6 py-0 my-0 mx-0"
          >
            Experience True Wellness
          </motion.h1>
          
          <motion.div 
            initial={{
              opacity: 0,
              scaleX: 0
            }} 
            animate={{
              opacity: 1,
              scaleX: 1
            }} 
            transition={{
              delay: 0.4
            }} 
            className="w-24 h-0.5 bg-white mx-auto my-0 py-[2px]"
          ></motion.div>
          
          <motion.p 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              delay: 0.5
            }} 
            className="mt-4 text-base md:text-xl text-white max-w-2xl mx-auto font-light my-0 py-0"
          >
            Discover a harmonious blend of luxury and healing at our exclusive wellness retreat,
            where personalized care meets natural rejuvenation.
          </motion.p>
          
          <motion.div 
            className="mt-12 flex flex-col sm:flex-row gap-6 justify-center" 
            initial={{
              opacity: 0,
              y: 20
            }} 
            animate={{
              opacity: 1,
              y: 0
            }} 
            transition={{
              delay: 0.7
            }}
          >
            <Link to="/booking">
              <Button size="lg" className="bg-white text-black hover:bg-opacity-90 px-8 rounded-none py-0">
                Book Your Stay
              </Button>
            </Link>
            
            <Link to="/rewards">
              <Button size="lg" variant="outline" className="border-white hover:bg-white rounded-none text-zinc-950 py-[16px] px-[23px]">
                Explore Packages
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Booking bar */}
        <motion.div 
          className="mb-16 w-full" 
          initial={{
            opacity: 0,
            y: 40
          }} 
          animate={{
            opacity: 1,
            y: 0
          }} 
          transition={{
            delay: 0.9,
            duration: 0.5
          }}
        >
          <BookingBar />
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2" 
          animate={{
            y: [0, 10, 0]
          }} 
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          }}
        >
          <div className="w-0.5 h-12 bg-white mx-auto px-px py-[17px] my-[153px]"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
