
import { useBooking } from '@/contexts/BookingContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BookingStepper from '@/components/booking/BookingStepper';
import BookingSummary from '@/components/booking/BookingSummary';
import PackageSelection from '@/components/booking/steps/PackageSelection';
import AddOnSelection from '@/components/booking/steps/AddOnSelection';
import RoomSelection from '@/components/booking/steps/RoomSelection';
import CheckoutForm from '@/components/booking/steps/CheckoutForm';

const BookingPage = () => {
  const { currentStep } = useBooking();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <PackageSelection />;
      case 2:
        return <AddOnSelection />;
      case 3:
        return <RoomSelection />;
      case 4:
        return <CheckoutForm />;
      default:
        return <PackageSelection />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto py-12 px-4 md:px-6">
          <div className="max-w-screen-xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Book Your Wellness Retreat
            </h1>
            
            <BookingStepper />
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                {renderCurrentStep()}
              </div>
              <div className="lg:col-span-1">
                <BookingSummary />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;
