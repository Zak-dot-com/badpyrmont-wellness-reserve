
import { motion } from 'framer-motion';
import { useState } from 'react';
import { events } from '@/data/eventsData';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventsShowcase = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section className="bg-slate-50 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">Upcoming Events</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us for exclusive events and experiences at Lanserhof
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
          >
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={false}
                animate={{ opacity: activeEvent === idx ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  zIndex: activeEvent === idx ? 1 : 0
                }}
              />
            ))}
          </motion.div>

          <div className="space-y-8">
            {events.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="cursor-pointer"
                onMouseEnter={() => setActiveEvent(idx)}
              >
                <div className={`p-6 rounded-lg transition-colors ${activeEvent === idx ? 'bg-white shadow-lg' : 'hover:bg-white/50'}`}>
                  <h3 className="text-xl font-medium mb-2">{event.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex gap-4">
                    <Link to={`/events/${event.id}`}>
                      <Button variant="outline">Learn More</Button>
                    </Link>
                    <Link to={`/booking?event=${event.id}`}>
                      <Button className="bg-amber-500 hover:bg-amber-600">
                        Book Now <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsShowcase;
