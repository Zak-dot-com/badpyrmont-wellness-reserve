
import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ContactInfoForm = () => {
  const { bookingData, setCustomerInfo } = useBooking();
  const { customerInfo } = bookingData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={customerInfo.firstName}
            onChange={(e) => setCustomerInfo({ firstName: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={customerInfo.lastName}
            onChange={(e) => setCustomerInfo({ lastName: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => setCustomerInfo({ email: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            value={customerInfo.phone}
            onChange={(e) => setCustomerInfo({ phone: e.target.value })}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
