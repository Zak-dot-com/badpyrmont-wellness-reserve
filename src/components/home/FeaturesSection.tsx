
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

const features = [
  {
    title: "Personalized Wellness",
    description: "Experience bespoke programs tailored to your unique health profile and goals."
  },
  {
    title: "Holistic Treatments",
    description: "Our integrative approach combines modern science with ancient healing traditions."
  },
  {
    title: "Luxurious Accommodations",
    description: "Retreat to elegant spaces designed for tranquility and rejuvenation."
  }
];

const FeatureItem = ({ title, description, index }: { title: string, description: string, index: number }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2 }}
      className="flex flex-col items-center text-center"
    >
      <div className="w-20 h-0.5 bg-hotel-primary mb-6"></div>
      <h3 className="text-xl md:text-2xl font-light mb-4 tracking-wide uppercase">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase mb-4">Wellness Philosophy</h2>
          <div className="w-24 h-0.5 bg-hotel-primary mx-auto my-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our approach integrates medical expertise, holistic therapies, and mindful nutrition 
            to create a transformational wellness experience that nurtures body, mind, and spirit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, index) => (
            <FeatureItem 
              key={index}
              index={index}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
