
import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white mt-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Experience Luxury Wellness</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Packages",
              description: "Choose from our carefully crafted wellness packages designed to meet your specific needs."
            },
            {
              title: "Luxury Accommodations",
              description: "Stay in our beautifully appointed rooms and suites for the ultimate comfort during your retreat."
            },
            {
              title: "Expert Therapists",
              description: "Our team of certified wellness professionals are dedicated to enhancing your wellbeing."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg text-center">
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
