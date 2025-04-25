
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { events } from '@/data/eventsData';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Card, CardContent } from '@/components/ui/card';

const EventsShowcase = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'party': return 'bg-amber-500';
      case 'carnival': return 'bg-emerald-500';
      case 'concert': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };
  
  const secondaryImages = [
    "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
    "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843"
  ];

  return (
    <section 
      ref={containerRef}
      className="py-24 overflow-hidden"
      style={{
        background: "linear-gradient(90deg, hsla(216, 41%, 79%, 1) 0%, hsla(186, 33%, 94%, 1) 100%)"
      }}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-light mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join us for exclusive events and experiences at Lanserhof
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Main Event Display - 3 columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <AspectRatio ratio={16/9} className="bg-black">
                {events.map((event, idx) => (
                  <motion.div
                    key={`main-${event.id}`}
                    initial={false}
                    animate={{ 
                      opacity: activeEvent === idx ? 1 : 0,
                      scale: activeEvent === idx ? 1 : 1.05 
                    }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${event.image})`,
                        filter: 'brightness(0.85)'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  </motion.div>
                ))}
              </AspectRatio>
              
              {events.map((event, idx) => (
                activeEvent === idx && (
                  <motion.div 
                    key={`info-${event.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 p-6 text-white"
                  >
                    <Badge className={`mb-3 ${getCategoryColor(event.category)} text-white`}>
                      {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                    </Badge>
                    <h3 className="text-3xl font-medium mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">
                          {new Date(event.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        <span className="text-sm">${event.price}</span>
                      </div>
                      {new Date(event.earlyBirdEndDate) > new Date() && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          <span className="text-sm">Early bird: ${event.earlyBirdPrice}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-4 items-center">
                      <Link to={`/events/${event.id}`}>
                        <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                          Learn More
                        </Button>
                      </Link>
                      <Link to={`/booking?event=${event.id}`}>
                        <Button className="bg-amber-500 hover:bg-amber-600">
                          Book Now <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
            
            {/* Secondary images row */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={`secondary-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index + 0.4 }}
                  className="relative overflow-hidden rounded-lg"
                >
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={secondaryImages[index]} 
                      alt="Event detail" 
                      className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
                    />
                  </AspectRatio>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Event cards - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="cursor-pointer"
                onMouseEnter={() => {
                  setActiveEvent(idx);
                  setHoveredEvent(idx);
                }}
                onMouseLeave={() => setHoveredEvent(null)}
              >
                <Card className={`transition-all duration-300 overflow-hidden ${
                  activeEvent === idx 
                    ? 'bg-white shadow-xl border-amber-300' 
                    : 'bg-white/70 hover:shadow-lg'
                }`}>
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-grow">
                          <h3 className={`text-xl font-medium mb-2 transition-all duration-300 ${
                            activeEvent === idx ? 'text-lanserhof-accent' : 'text-gray-900'
                          }`}>
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-3">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                            {' • '}{event.location}
                          </p>
                        </div>
                        <Badge className={`${getCategoryColor(event.category)} text-white`}>
                          {event.category}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                      
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <div className="flex items-center text-sm text-amber-800 mb-4 cursor-pointer">
                            <span className="font-semibold mr-2">
                              ${event.price}
                            </span>
                            {new Date(event.earlyBirdEndDate) > new Date() && (
                              <Badge variant="outline" className="text-green-600 border-green-300">
                                Early Bird: ${event.earlyBirdPrice}
                              </Badge>
                            )}
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-64">
                          <div className="text-sm">
                            <p className="font-medium">Price Information</p>
                            <p className="text-gray-500 mt-1">Regular price: ${event.price}</p>
                            <p className="text-gray-500">Early bird price: ${event.earlyBirdPrice}</p>
                            <p className="text-gray-500">
                              Early bird ends: {new Date(event.earlyBirdEndDate).toLocaleDateString()}
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                      
                      <div className={`flex gap-4 transition-all duration-300 ${
                        hoveredEvent === idx ? 'opacity-100' : 'opacity-80'
                      }`}>
                        <Link to={`/events/${event.id}`}>
                          <Button variant="outline" size="sm">
                            Details
                          </Button>
                        </Link>
                        <Link to={`/booking?event=${event.id}`}>
                          <Button className="bg-amber-500 hover:bg-amber-600" size="sm">
                            Book <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                    
                    <motion.div 
                      className={`h-1 bg-amber-400 mt-2`}
                      initial={{ width: "0%" }}
                      animate={{ width: activeEvent === idx ? "100%" : "0%" }}
                      transition={{ duration: 0.6 }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;
