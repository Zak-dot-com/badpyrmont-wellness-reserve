
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { CalendarRange, CircleCheck } from 'lucide-react';
import { format } from 'date-fns';

const PackageSelection = () => {
  const { 
    bookingData, 
    availablePackages, 
    selectPackage, 
    setDuration, 
    setStartDate, 
    setCurrentStep,
    calculateEndDate 
  } = useBooking();
  
  const { selectedPackage, duration, startDate } = bookingData;
  const endDate = calculateEndDate();

  const handleContinue = () => {
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }

    setCurrentStep(2);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6">Select Your Wellness Package</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePackages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`cursor-pointer transition-all ${
                selectedPackage?.id === pkg.id 
                  ? 'ring-2 ring-hotel-primary' 
                  : 'hover:shadow-md'
              }`}
              onClick={() => selectPackage(pkg.id)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{pkg.name}</CardTitle>
                  {selectedPackage?.id === pkg.id && (
                    <CircleCheck className="h-6 w-6 text-hotel-primary" />
                  )}
                </div>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-hotel-primary">
                  {pkg.basePrice} € <span className="text-sm text-gray-500">/ day</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-6">Choose Your Duration & Dates</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Package Duration
            </label>
            <Select
              value={duration}
              onValueChange={(value) => setDuration(value as "4" | "7" | "14")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4 Days</SelectItem>
                <SelectItem value="7">7 Days</SelectItem>
                <SelectItem value="14">14 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Date Range
            </label>
            <div className="bg-white border rounded-md p-3">
              <div className="flex items-center space-x-2 text-gray-700">
                <CalendarRange className="h-5 w-5" />
                <span>
                  {startDate 
                    ? `${format(startDate, 'MMM dd, yyyy')} ${
                        endDate ? `to ${format(endDate, 'MMM dd, yyyy')}` : ''
                      }`
                    : 'Select a start date'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <Calendar
            mode="single"
            selected={startDate || undefined}
            onSelect={(date) => setStartDate(date)}
            className="rounded-md border p-3 pointer-events-auto"
            disabled={(date) => {
              // Disable dates in the past
              return date < new Date();
            }}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleContinue}
          className="bg-hotel-primary hover:bg-hotel-primary/90"
          size="lg"
        >
          Continue to Add-ons
        </Button>
      </div>
    </div>
  );
};

export default PackageSelection;
