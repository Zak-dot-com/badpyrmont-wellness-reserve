import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BookingBar from './BookingBar';
const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = ["https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop", "https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=1470&auto=format&fit=crop", "https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=1470&auto=format&fit=crop"];

  // Mouse cursor effect variables
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Create spring animations for smoother movement
  const springConfig = {
    damping: 25,
    stiffness: 700
  };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Handle mouse movement for cursor effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const {
      clientX,
      clientY
    } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return <section className="relative h-screen overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Background image carousel */}
      {images.map((img, index) => <motion.div key={index} className="absolute inset-0 z-0 bg-cover bg-center" style={{
      backgroundImage: `url('${img}')`
    }} initial={{
      opacity: 0
    }} animate={{
      opacity: currentSlide === index ? 1 : 0,
      transition: {
        duration: 1.5
      }
    }} />)}
      
      {/* Custom cursor effect - only visible in the hero section */}
      <motion.div ref={cursorRef} className="pointer-events-none fixed z-50 mix-blend-difference" style={{
      x: cursorX,
      y: cursorY,
      translateX: "-50%",
      translateY: "-50%"
    }}>
        <div className="relative">
          <motion.div className="w-12 h-12 rounded-full bg-white opacity-60" initial={{
          scale: 0.8
        }} animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.6, 0.9, 0.6]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
        </div>
      </motion.div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full container mx-auto px-4 py-0">
        {/* Hero text */}
        <div className="flex-grow flex flex-col justify-center items-center text-center pt-24 md:pt-28 py-[82px]">
          <motion.div className="mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            
          </motion.div>
          
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.3
        }} className="text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide uppercase mb-6 py-0 my-0 mx-0">
            Experience True Wellness
          </motion.h1>
          
          <motion.div initial={{
          opacity: 0,
          scaleX: 0
        }} animate={{
          opacity: 1,
          scaleX: 1
        }} transition={{
          delay: 0.4
        }} className="w-24 h-0.5 bg-white mx-auto my-0 py-[2px]"></motion.div>
          
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5
        }} className="mt-4 text-base md:text-xl text-white max-w-2xl mx-auto font-light my-0 py-0">
            Discover a harmonious blend of luxury and healing at our exclusive wellness retreat,
            where personalized care meets natural rejuvenation.
          </motion.p>
          
          <motion.div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }}>
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
        <motion.div className="mb-16 w-full" initial={{
        opacity: 0,
        y: 40
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.9,
        duration: 0.5
      }}>
          <BookingBar />
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2" animate={{
        y: [0, 10, 0]
      }} transition={{
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut"
      }}>
          <div className="w-0.5 h-12 bg-white mx-auto px-px py-[17px] my-[153px]"></div>
        </motion.div>
      </div>
    </section>;
};
export default HeroSection;