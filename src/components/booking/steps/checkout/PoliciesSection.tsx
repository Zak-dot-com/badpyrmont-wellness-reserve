
import React from 'react';
import PolicyCheckbox from '../PolicyCheckbox';
import PolicyDialog from '../PolicyDialog';

interface PoliciesSectionProps {
  termsAccepted: boolean;
  privacyAccepted: boolean;
  setShowTermsDialog: (show: boolean) => void;
  setShowPrivacyDialog: (show: boolean) => void;
  showTermsDialog: boolean;
  showPrivacyDialog: boolean;
  setTermsAccepted: (accepted: boolean) => void;
  setPrivacyAccepted: (accepted: boolean) => void;
}

const PoliciesSection = ({
  termsAccepted,
  privacyAccepted,
  setShowTermsDialog,
  setShowPrivacyDialog,
  showTermsDialog,
  showPrivacyDialog,
  setTermsAccepted,
  setPrivacyAccepted
}: PoliciesSectionProps) => {
  return (
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

export default PoliciesSection;
