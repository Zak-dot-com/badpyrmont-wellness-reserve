
import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CountryCodeSelect from './CountryCodeSelect';

// Helper to split and join phone/countryCode for legacy support
const parsePhone = (phone: string) => {
  // Try to split into country code and rest (must match at least 'code rest')
  const matches = phone.match(/^(\+\d{1,4})\s*(.*)$/);
  if (matches) {
    return { countryCode: matches[1], localPhone: matches[2] };
  } else {
    // Default to Germany +49
    return { countryCode: '+49', localPhone: phone || '' };
  }
};
const joinPhone = (countryCode: string, localPhone: string) => {
  return `${countryCode} ${localPhone}`.trim();
};

const ContactInfoForm = () => {
  const { bookingData, setCustomerInfo } = useBooking();
  const { customerInfo } = bookingData;

  // Maintain splitting in local state for dynamic UI
  const phoneParts = parsePhone(customerInfo.phone);

  // Handler for normal fields
  const handleChange = (field: keyof typeof customerInfo, value: string) => {
    setCustomerInfo({ [field]: value });
  };

  // Handler for composite phone update
  const handleCountryCodeChange = (countryCode: string) => {
    setCustomerInfo({ phone: joinPhone(countryCode, phoneParts.localPhone) });
  };
  const handleLocalPhoneChange = (v: string) => {
    setCustomerInfo({ phone: joinPhone(phoneParts.countryCode, v) });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-medium mb-4">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={customerInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={customerInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={customerInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="flex items-center">
            <CountryCodeSelect
              value={phoneParts.countryCode}
              onChange={handleCountryCodeChange}
            />
            <Input
              id="phone"
              type="tel"
              autoComplete="tel-national"
              value={phoneParts.localPhone}
              onChange={(e) => handleLocalPhoneChange(e.target.value)}
              required
              className="flex-1"
              placeholder="123456789"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoForm;
