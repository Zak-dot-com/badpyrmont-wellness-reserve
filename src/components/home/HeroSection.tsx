import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BookingBar from './BookingBar';
const HeroSection = () => {
  const [bookingType, setBookingType] = useState<'room' | 'wellness' | 'event'>('room');
  return <section className="relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-cover bg-center opacity-80" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop')"
    }} />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-5"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full container mx-auto px-4">
        {/* Hero text */}
        <div className="flex-grow flex flex-col justify-center items-center text-center pt-16 md:pt-24">
          <motion.div className="mb-6" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <img src="public/lovable-uploads/78397ad2-eb1f-43fb-9dca-2690a664b4ba.png" alt="Grand Hotel Bad Pyrmont" className="h-32 md:h-40 mx-auto" />
          </motion.div>
          
          <motion.p className="mt-4 text-base md:text-lg text-white max-w-xl" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
            Experience rejuvenation in our luxury wellness retreat with personalized packages, 
            premium accommodations, and expert care.
          </motion.p>
          
          <motion.div className="mt-6 flex flex-col sm:flex-row gap-4" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }}>
            <Link to="/booking?bookingType=package">
              
            </Link>
            <Link to="/book-room">
              
            </Link>
          </motion.div>
        </div>
        
        {/* Booking bar */}
        <div className="mb-16 w-full">
          <BookingBar />
        </div>
      </div>
    </section>;
};
export default HeroSection;