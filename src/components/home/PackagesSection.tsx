
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PackagesSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Featured Wellness Packages</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Discover our most popular wellness packages, designed to provide you with the ultimate relaxation experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Relaxation Retreat",
              price: "€480",
              duration: "4 Days",
              description: "A peaceful wellness package focused on relaxation and stress relief."
            },
            {
              name: "Detox & Revitalize",
              price: "€600",
              duration: "4 Days",
              description: "Cleanse your body and mind with this comprehensive detox program."
            },
            {
              name: "Luxury Wellness Escape",
              price: "€880",
              duration: "4 Days",
              description: "Our premium package with exclusive treatments and personalized service."
            }
          ].map((pkg, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-2xl font-bold text-hotel-primary">{pkg.price}</span>
                  <span className="text-gray-500 ml-2">/ {pkg.duration}</span>
                </div>
                <p className="text-gray-600 mb-6">{pkg.description}</p>
                <Link to="/booking" className="block">
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
