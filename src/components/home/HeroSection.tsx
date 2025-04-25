import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import BookingBar from './BookingBar';
import { events } from '@/data/eventsData';
import EventRegistrationModal from './EventRegistrationModal';
import MiniEventSlider from './MiniEventSlider';
import AnimatedLotus from './AnimatedLotus';
const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const allContent = [{
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop",
    title: "DISCOVER",
    subtitle: "LONGEVITY WELLNESS",
    description: "WHERE HEALTH MEETS LUXURY",
    isEvent: false
  }, ...events.map(event => ({
    image: event.image,
    title: event.title.toUpperCase(),
    subtitle: `${new Date(event.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}`,
    description: event.description,
    isEvent: true,
    event
  }))];
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % allContent.length);
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
      y: "-50%"
    },
    expanded: {
      width: "100vw",
      height: "100vh",
      top: "0%",
      left: "0%",
      x: "0%",
      y: "0%",
      transition: {
        duration: 1.2,
        ease: [0.33, 1, 0.68, 1]
      }
    }
  };
  const contentVariants = {
    hidden: {
      opacity: 0
    },
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
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
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
  return <section className="relative w-full h-screen overflow-hidden bg-black">
      <motion.div className="absolute bg-black overflow-hidden z-20" initial="initial" animate={isLoaded ? "expanded" : "initial"} variants={squareVariants}>
        {allContent.map((content, index) => <motion.div key={index} className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url('${content.image}')`
      }} initial={{
        opacity: 0
      }} animate={{
        opacity: currentSlide === index ? 1 : 0,
        transition: {
          duration: 1.5
        }
      }}>
            <AnimatePresence mode="wait">
              {currentSlide === index && <div className="absolute right-10 top-1/2 -translate-y-1/2 text-right z-30">
                  <motion.div variants={textVariants} initial="enter" animate="center" exit="exit" className="relative">
                    <div className="absolute inset-0 bg-black/20 -right-4 -left-4 -top-2 -bottom-2 z-[-1] rounded-sm" />
                    
                    <motion.h2 variants={textVariants} className="text-2xl md:text-3xl font-light text-white tracking-widest">
                      {content.title}
                    </motion.h2>
                    <motion.h3 variants={textVariants} className="text-3xl md:text-4xl font-serif text-white mb-1">
                      {content.subtitle}
                    </motion.h3>
                    <motion.p variants={textVariants} className="text-sm md:text-base font-light text-white tracking-[0.2em]">
                      {content.description}
                    </motion.p>
                    
                    {content.isEvent && 'event' in content && <motion.div variants={textVariants} className="mt-4 relative z-40">
                        <Button onClick={() => setSelectedEvent(content.event)} className="bg-amber-500 hover:bg-amber-600 text-white pointer-events-auto">
                          Book Tickets
                        </Button>
                      </motion.div>}
                  </motion.div>
                </div>}
            </AnimatePresence>
          </motion.div>)}
      </motion.div>

      <MiniEventSlider />

      <div className="absolute inset-0 bg-black/20 z-10" />

      <motion.div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 text-white text-center" initial={{
      opacity: 0
    }} animate={{
      opacity: 1,
      transition: {
        delay: 1.5,
        duration: 0.8
      }
    }}>
        <div className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wider leading-none">
          
          
          
        </div>
        
        <div className="mt-12">
          
        </div>
      </motion.div>

      <motion.div className="absolute right-0 bottom-1/4 z-30 text-white max-w-lg px-8 md:pr-16 lg:pr-24" initial="hidden" animate={isLoaded ? "visible" : "hidden"} variants={contentVariants}>
        
        
        

        <motion.div variants={itemVariants}>
          <Link to="/booking">
            
          </Link>
        </motion.div>
      </motion.div>

      <motion.div className="absolute left-0 bottom-0 bg-slate-900/90 z-20 text-white md:w-80" initial={{
      opacity: 0,
      y: 100
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1.8,
      duration: 0.8
    }}>
        
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 z-30 bg-black/70 p-4">
        <div className="container mx-auto">
          <BookingBar />
        </div>
      </div>

      <EventRegistrationModal event={selectedEvent} isOpen={!!selectedEvent} onClose={() => setSelectedEvent(null)} />

      <div className="absolute bottom-0 right-0 mb-[calc(72px+0.75rem)] mr-3 z-30 my-0 py-[52px]">
        <AnimatedLotus />
      </div>
    </section>;
};
export default HeroSection;