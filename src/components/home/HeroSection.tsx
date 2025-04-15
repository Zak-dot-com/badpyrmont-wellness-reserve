
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import BookingBar from './BookingBar';

const HeroSection = () => {
  const [bookingType, setBookingType] = useState<'room' | 'wellness' | 'event'>('room');

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-b from-amber-50 to-white">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full container mx-auto px-4">
        {/* Hero text */}
        <div className="flex-grow flex flex-col justify-center items-center text-center pt-16 md:pt-24">
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tighter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Your Wellness <br className="hidden md:block" />
            <span className="text-amber-600">Journey Awaits</span>
          </motion.h1>
          
          <motion.p 
            className="mt-6 text-lg md:text-xl text-gray-700 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Experience rejuvenation in our luxury wellness retreat with personalized packages, 
            premium accommodations, and expert care.
          </motion.p>
          
          <motion.div 
            className="mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/booking?bookingType=package">
              <Button size="lg" className="px-8 bg-amber-500 hover:bg-amber-600">
                Explore Wellness Packages
              </Button>
            </Link>
            <Link to="/book-room">
              <Button size="lg" variant="outline" className="px-8 border-amber-500 text-amber-700 hover:bg-amber-50">
                Book Room Only
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Booking bar */}
        <div className="mb-16 w-full">
          <BookingBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
