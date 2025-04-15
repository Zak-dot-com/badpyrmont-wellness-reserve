
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { availablePackages } from '@/data/packagesData';

const PackagesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Wellness Packages</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our most popular wellness packages, designed to provide you with the ultimate relaxation experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePackages.map((pkg, index) => (
            <div key={pkg.id} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-hotel-primary">{pkg.basePrice * 4}€</span>
                  <span className="text-gray-500 ml-2">/ 4 Days</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <Link to={`/booking?package=${pkg.id}`} className="block">
                  <Button className="w-full bg-hotel-primary hover:bg-hotel-primary/90">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
