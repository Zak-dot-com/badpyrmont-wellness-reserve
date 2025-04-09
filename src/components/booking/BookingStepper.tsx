
import { useBooking } from '@/contexts/BookingContext';
import { Check } from 'lucide-react';

const BookingStepper = () => {
  const { currentStep } = useBooking();

  const steps = [
    { id: 1, name: 'Package & Date' },
    { id: 2, name: 'Add-ons' },
    { id: 3, name: 'Room Selection' },
    { id: 4, name: 'Checkout' }
  ];

  return (
    <div className="booking-progress-bar">
      <ol className="flex items-center w-full mb-4 sm:mb-5">
        {steps.map((step) => (
          <li
            key={step.id}
            className={`flex w-full items-center ${step.id < currentStep ? 'text-green-500' : step.id === currentStep ? 'text-hotel-primary' : 'text-gray-400'}`}
          >
            <div
              className={`flex items-center justify-center w-8 h-8 ${step.id < currentStep ? 'bg-green-100 rounded-full' : step.id === currentStep ? 'bg-hotel-primary/10 rounded-full' : 'bg-gray-100 rounded-full'}`}
            >
              {step.id < currentStep ? (
                <Check className="w-5 h-5 text-green-500" />
              ) : (
                <span className={`text-sm font-medium ${step.id === currentStep ? 'text-hotel-primary' : 'text-gray-500'}`}>
                  {step.id}
                </span>
              )}
            </div>
            <span
              className={`ms-2 text-sm font-medium ${step.id < currentStep ? 'text-green-500' : step.id === currentStep ? 'text-hotel-primary' : 'text-gray-400'}`}
            >
              {step.name}
            </span>
            {step.id !== steps.length && (
              <div 
                className={`flex-1 h-0.5 mx-4 ${step.id < currentStep ? 'bg-green-500' : 'bg-gray-200'}`}
              ></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default BookingStepper;
