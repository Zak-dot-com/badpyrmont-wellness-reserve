import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PolicyDialog from './PolicyDialog';
import PolicyCheckbox from './PolicyCheckbox';

const CheckoutForm = () => {
  const { bookingData, setCustomerInfo, setCurrentStep } = useBooking();
  const { customerInfo } = bookingData;
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleBack = () => {
    setCurrentStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!customerInfo.firstName || !customerInfo.lastName || !customerInfo.email || !customerInfo.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      toast.error("Please accept both Terms & Conditions and Privacy Policy to proceed");
      return;
    }
    
    // Process submission
    setIsSubmitting(true);
    
    // Simulate API call/processing
    setTimeout(() => {
      toast.success("Booking completed successfully!");
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        <p className="text-gray-600">Complete your booking by providing your details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
        
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Payment Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="cardName">Cardholder Name</Label>
              <Input id="cardName" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input id="expiry" placeholder="MM/YY" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input id="cvc" maxLength={3} required />
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-6">
          <PolicyCheckbox
            checked={termsAccepted}
            onClick={() => setShowTermsDialog(true)}
            label="Read & Accept our Terms & Conditions"
          />
          <PolicyCheckbox
            checked={privacyAccepted}
            onClick={() => setShowPrivacyDialog(true)}
            label="Read & Accept our Privacy Policy"
          />
        </div>
        
        <div className="flex justify-between pt-6">
          <Button 
            type="button"
            onClick={handleBack}
            variant="outline"
            size="lg"
          >
            Back
          </Button>
          <Button 
            type="submit"
            className="bg-hotel-primary hover:bg-hotel-primary/90"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </Button>
        </div>
      </form>

      <PolicyDialog
        isOpen={showTermsDialog}
        onClose={() => setShowTermsDialog(false)}
        onAccept={() => setTermsAccepted(true)}
        title="Terms & Conditions"
        content={`
          <h3 class="text-lg font-semibold mb-4">1. Booking and Cancellation</h3>
          <p class="mb-4">1.1. Reservations are considered confirmed upon receipt of payment.</p>
          <p class="mb-4">1.2. Cancellations must be made at least 48 hours prior to check-in.</p>
          
          <h3 class="text-lg font-semibold mb-4">2. Check-in/Check-out</h3>
          <p class="mb-4">2.1. Check-in time is 3:00 PM local time.</p>
          <p class="mb-4">2.2. Check-out time is 11:00 AM local time.</p>
          
          <h3 class="text-lg font-semibold mb-4">3. Payment</h3>
          <p class="mb-4">3.1. Full payment is required at the time of booking.</p>
          <p class="mb-4">3.2. All rates are in euros and include applicable taxes.</p>
          
          <h3 class="text-lg font-semibold mb-4">4. Wellness Services</h3>
          <p class="mb-4">4.1. Spa appointments must be booked in advance.</p>
          <p class="mb-4">4.2. Cancellation of spa services requires 24-hour notice.</p>
        `}
      />

      <PolicyDialog
        isOpen={showPrivacyDialog}
        onClose={() => setShowPrivacyDialog(false)}
        onAccept={() => setPrivacyAccepted(true)}
        title="Privacy Policy"
        content={`
          <h3 class="text-lg font-semibold mb-4">1. Information Collection</h3>
          <p class="mb-4">1.1. We collect personal information necessary for booking and service delivery.</p>
          <p class="mb-4">1.2. Data collected includes name, contact details, and payment information.</p>
          
          <h3 class="text-lg font-semibold mb-4">2. Use of Information</h3>
          <p class="mb-4">2.1. Your information is used to process bookings and improve services.</p>
          <p class="mb-4">2.2. We may send promotional materials with your consent.</p>
          
          <h3 class="text-lg font-semibold mb-4">3. Data Protection</h3>
          <p class="mb-4">3.1. We implement security measures to protect your data.</p>
          <p class="mb-4">3.2. Your information is never sold to third parties.</p>
          
          <h3 class="text-lg font-semibold mb-4">4. Your Rights</h3>
          <p class="mb-4">4.1. You may request access to your personal data.</p>
          <p class="mb-4">4.2. You can opt-out of marketing communications at any time.</p>
        `}
      />
    </div>
  );
};

export default CheckoutForm;
