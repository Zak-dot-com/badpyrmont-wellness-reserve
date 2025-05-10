
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactInfoForm from './checkout/ContactInfoForm';
import PaymentForm from './checkout/PaymentForm';
import PoliciesSection from './checkout/PoliciesSection';
import CancellationPolicySection from './checkout/CancellationPolicySection';

const CheckoutForm = () => {
  const {
    bookingData,
    setCurrentStep
  } = useBooking();
  const {
    customerInfo
  } = bookingData;
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

  return <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Checkout</h2>
        <p className="text-gray-600">Complete your booking by providing your details</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <ContactInfoForm />
        <PaymentForm />
        
        <CancellationPolicySection />
        
        <PoliciesSection 
          termsAccepted={termsAccepted} 
          privacyAccepted={privacyAccepted} 
          setShowTermsDialog={setShowTermsDialog} 
          setShowPrivacyDialog={setShowPrivacyDialog} 
          showTermsDialog={showTermsDialog} 
          showPrivacyDialog={showPrivacyDialog} 
          setTermsAccepted={setTermsAccepted} 
          setPrivacyAccepted={setPrivacyAccepted} 
        />
        
        <div className="flex justify-between pt-6">
          <Button type="button" onClick={handleBack} variant="outline" size="lg">
            Back
          </Button>
          <Button type="submit" size="lg" disabled={isSubmitting} className="bg-amber-500 hover:bg-amber-400 text-slate-50">
            {isSubmitting ? "Processing..." : "Complete Booking"}
          </Button>
        </div>
      </form>
    </div>;
};

export default CheckoutForm;
