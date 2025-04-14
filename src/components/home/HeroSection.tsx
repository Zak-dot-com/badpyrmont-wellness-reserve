
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BookingBar from './BookingBar';

const HeroSection = () => {
  return (
    <section className="relative bg-hotel-primary text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-hotel-primary to-blue-900 opacity-90"></div>
      <div className="container mx-auto py-24 px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Grand Hotel Badpyrmont Wellness Center
          </h1>
          <p className="text-xl mb-8">
            Experience ultimate relaxation and rejuvenation at our luxury wellness retreat.
            Discover personalized wellness packages designed for your mind, body and soul.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/booking">
              <Button size="lg" className="bg-hotel-accent text-hotel-primary hover:bg-hotel-accent/90">
                Book Your Retreat
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-hotel-primary">
              Explore Packages
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Bar with Dropdowns */}
      <div className="relative -mb-24 z-20">
        <div className="container mx-auto px-4 md:px-6">
          <BookingBar />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
