
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Event } from '@/data/eventsData';
import { ArrowRight } from 'lucide-react';

const EventDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event as Event;

  if (!event) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <Button onClick={() => navigate('/')}>Return Home</Button>
        </div>
      </PageLayout>
    );
  }

  const handleBookNow = () => {
    sessionStorage.setItem('eventBooking', JSON.stringify({
      event,
      registration: null,
      totalPrice: event.earlyBirdPrice
    }));
    navigate('/booking?type=event');
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <div className="space-y-2">
              <p className="text-lg text-gray-600">{event.description}</p>
              <p className="text-lg"><strong>Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p className="text-lg"><strong>Location:</strong> {event.location}</p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-2xl font-semibold mb-2">Super Early Bird Offer!</h3>
              <p className="text-xl text-amber-600">€{event.earlyBirdPrice} per person</p>
              <p className="text-sm text-gray-600">Valid until {new Date(event.earlyBirdEndDate).toLocaleDateString()}</p>
            </div>
            <Button 
              onClick={handleBookNow}
              size="lg"
              className="bg-orange-500 hover:bg-orange-400 text-zinc-50"
            >
              Book Now <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventDetailsPage;
