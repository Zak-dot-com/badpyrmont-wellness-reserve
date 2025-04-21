import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { availablePackages } from '@/data/packagesData';
const PackagesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2
  });
  return <section ref={sectionRef} className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.7
      }} className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase mb-4">
            Curated Wellness Experiences
          </h2>
          <div className="w-24 h-0.5 bg-hotel-primary mx-auto my-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our expertly crafted wellness packages combine therapeutic treatments, 
            mindful movement, and nutritional guidance for profound transformation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {availablePackages.map((pkg, index) => {
          const itemRef = useRef(null);
          const isItemInView = useInView(itemRef, {
            once: true,
            amount: 0.3
          });
          return <motion.div key={pkg.id} ref={itemRef} initial={{
            opacity: 0,
            y: 30
          }} animate={isItemInView ? {
            opacity: 1,
            y: 0
          } : {}} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="bg-white overflow-hidden flex flex-col group">
                <div className="relative h-64 overflow-hidden">
                  <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-500 group-hover:bg-opacity-30"></div>
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="text-xl font-light tracking-wide uppercase mb-3 transition-transform duration-300 group-hover:scale-105">{pkg.name}</h3>
                  <div className="w-12 h-0.5 bg-orange-500 mb-4"></div>
                  <p className="text-gray-600 text-sm mb-6">{pkg.description}</p>
                  
                  <div className="mt-auto">
                    <div className="flex items-baseline mb-6">
                      <span className="text-2xl font-light">{pkg.basePrice * 4}€</span>
                      <span className="text-gray-500 ml-2 text-sm">/ 4 Days</span>
                    </div>
                    
                    <Link to={`/booking?package=${pkg.id}`} className="block transition-transform duration-300 hover:scale-105">
                      <Button className="w-full rounded-none text-white bg-hotel-accent">
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>;
        })}
        </div>
      </div>
    </section>;
};
export default PackagesSection;