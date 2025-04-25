
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { events } from '@/data/eventsData';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MiniEventSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="absolute left-2 bottom-24 bg-black/70 p-4 rounded-lg max-w-xs">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-white"
        >
          <h4 className="text-sm font-light tracking-wider mb-1">UPCOMING EVENT</h4>
          <h3 className="text-lg font-medium mb-2">{events[currentSlide].title}</h3>
          <p className="text-xs text-gray-300 mb-3">
            {new Date(events[currentSlide].date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between items-center mt-2">
        <div className="flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                currentSlide === index ? "bg-white" : "bg-white/30"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 border-none"
            onClick={handlePrev}
          >
            <ArrowLeft className="h-3 w-3" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            className="h-6 w-6 rounded-full bg-white/10 hover:bg-white/20 border-none"
            onClick={handleNext}
          >
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MiniEventSlider;
