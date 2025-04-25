import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import CountryCodeSelect from '@/components/booking/steps/checkout/CountryCodeSelect';
import { Event } from '@/data/eventsData';
import { useNavigate } from 'react-router-dom';
interface EventRegistrationModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}
const EventRegistrationModal = ({
  event,
  isOpen,
  onClose
}: EventRegistrationModalProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    countryCode: '+49',
    email: '',
    attendees: 1
  });

  // If no event is provided, don't render the modal contents
  if (!event) {
    return <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Event Not Found</DialogTitle>
          </DialogHeader>
          <p className="py-4">Sorry, the event information could not be loaded.</p>
          <Button onClick={onClose}>Close</Button>
        </DialogContent>
      </Dialog>;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store event registration data in sessionStorage
    sessionStorage.setItem('eventBooking', JSON.stringify({
      event,
      registration: formData,
      totalPrice: event.earlyBirdPrice * formData.attendees
    }));
    onClose();
    navigate('/booking?type=event');
  };
  return <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{event.title}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={formData.name} onChange={e => setFormData(prev => ({
            ...prev,
            name: e.target.value
          }))} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={formData.email} onChange={e => setFormData(prev => ({
            ...prev,
            email: e.target.value
          }))} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex gap-2">
              <CountryCodeSelect value={formData.countryCode} onChange={code => setFormData(prev => ({
              ...prev,
              countryCode: code
            }))} />
              <Input id="phone" type="tel" value={formData.phone} onChange={e => setFormData(prev => ({
              ...prev,
              phone: e.target.value
            }))} required className="flex-1" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Number of Attendees</Label>
            <Input id="attendees" type="number" min="1" max="10" value={formData.attendees} onChange={e => setFormData(prev => ({
            ...prev,
            attendees: parseInt(e.target.value)
          }))} required />
          </div>

          <div className="pt-4">
            <div className="mb-4">
              <p className="text-lg font-semibold">Super Early Bird Price:</p>
              <p className="text-xl text-amber-600">€{event.earlyBirdPrice} per person</p>
              <p className="text-sm text-gray-500">Valid until {new Date(event.earlyBirdEndDate).toLocaleDateString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">Total: €{event.earlyBirdPrice * formData.attendees}</p>
              <Button type="submit" className="bg-orange-500 hover:bg-orange-400 text-zinc-50">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>;
};
export default EventRegistrationModal;