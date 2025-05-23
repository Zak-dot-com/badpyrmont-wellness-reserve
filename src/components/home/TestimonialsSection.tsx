
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Star } from 'lucide-react';

type Testimonial = {
  id: number;
  name: string;
  country: string;
  text: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elena Müller",
    country: "Germany",
    text: "The wellness retreat exceeded all my expectations. The spa treatments were exceptional, and I felt completely rejuvenated after my stay.",
    rating: 5
  },
  {
    id: 2,
    name: "Jean-Pierre Dubois",
    country: "France",
    text: "Magnifique! The staff was attentive to every detail, and the thermal baths were divine. I will definitely return soon.",
    rating: 5
  },
  {
    id: 3,
    name: "Sarah Johnson",
    country: "United States",
    text: "Worth every penny! The wellness programs are expertly designed, and the accommodations are luxurious. I've already booked my next visit.",
    rating: 5
  },
  {
    id: 4,
    name: "Antonio Rossi",
    country: "Italy",
    text: "An oasis of tranquility. The combination of traditional and modern treatments created a perfect balance for mind and body relaxation.",
    rating: 4
  },
  {
    id: 5,
    name: "Yuki Tanaka",
    country: "Japan",
    text: "The attention to detail and the serene atmosphere made this the perfect retreat. The mindfulness sessions were particularly beneficial.",
    rating: 5
  },
  {
    id: 6,
    name: "Maria Gonzalez",
    country: "Spain",
    text: "Incredible experience from start to finish! The nutrition program complemented the treatments perfectly, and I left feeling completely transformed.",
    rating: 5
  },
  {
    id: 7,
    name: "Anders Johansson",
    country: "Sweden",
    text: "The perfect blend of luxury and wellness. The mountain views from the relaxation areas added another dimension to the experience.",
    rating: 4
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide uppercase mb-4">
            Guest Experiences
          </h2>
          <div className="w-24 h-0.5 bg-hotel-primary mx-auto my-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover what our guests have to say about their transformative journeys with us.
          </p>
        </motion.div>
        
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const testimonialRef = useRef(null);
              const isTestimonialInView = useInView(testimonialRef, { once: true, amount: 0.3 });
              
              return (
                <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <motion.div
                    ref={testimonialRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isTestimonialInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                  >
                    <Card className="h-full border-none shadow-sm">
                      <CardContent className="pt-8">
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < testimonial.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <blockquote className="text-gray-700 italic mb-4 text-sm">"{testimonial.text}"</blockquote>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <div>
                          <p className="font-medium text-sm">{testimonial.name}</p>
                          <p className="text-gray-500 text-xs">{testimonial.country}</p>
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-2">
            <CarouselPrevious className="static relative transform-none" />
            <CarouselNext className="static relative transform-none" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
