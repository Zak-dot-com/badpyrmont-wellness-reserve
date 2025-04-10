
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
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { toast } from 'sonner';
import { CalendarRange, CircleCheck, Sparkles, Bath, Dumbbell, Heart, Leaf, BedDouble } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

type PackageSelectionProps = {
  isEditMode?: boolean;
  onEditComplete?: () => void;
};

const PackageSelection = ({ isEditMode = false, onEditComplete }: PackageSelectionProps) => {
  const { 
    bookingData, 
    availablePackages, 
    selectPackage, 
    setDuration, 
    setStartDate, 
    setCurrentStep,
    calculateEndDate,
    getStandardRoom
  } = useBooking();
  
  const { selectedPackage, duration, startDate } = bookingData;
  const endDate = calculateEndDate();
  const standardRoom = getStandardRoom();

  const getPackageIcon = (packageType: string) => {
    switch (packageType) {
      case 'rejuvenation':
        return <Sparkles className="h-6 w-6 text-amber-500" />;
      case 'relaxation':
        return <Bath className="h-6 w-6 text-blue-500" />;
      case 'fitness':
        return <Dumbbell className="h-6 w-6 text-green-500" />;
      case 'wellness':
        return <Heart className="h-6 w-6 text-red-500" />;
      default:
        return <Leaf className="h-6 w-6 text-emerald-500" />;
    }
  };

  const calculatePackagePrice = (basePrice: number) => {
    const selectedDuration = parseInt(duration);
    return basePrice * selectedDuration;
  };

  const handleContinue = () => {
    if (!selectedPackage) {
      toast.error("Please select a package");
      return;
    }

    if (!startDate) {
      toast.error("Please select a start date");
      return;
    }

    if (isEditMode && onEditComplete) {
      onEditComplete();
      toast.success("Package updated successfully");
    } else {
      setCurrentStep(2);
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {!isEditMode && (
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-6">Select Your Wellness Package</h2>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePackages.map((pkg) => (
            <motion.div 
              key={pkg.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card 
                className={`cursor-pointer transition-all relative overflow-hidden ${
                  selectedPackage?.id === pkg.id 
                    ? 'ring-2 ring-hotel-primary' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => selectPackage(pkg.id)}
              >
                {pkg.image && (
                  <div className="relative h-40">
                    <img 
                      src={pkg.image} 
                      alt={pkg.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-4 text-white">
                        <h3 className="text-lg font-bold">{pkg.name}</h3>
                      </div>
                    </div>
                  </div>
                )}
                
                <CardHeader className="pt-4 pb-2">
                  <div className="flex justify-between items-start">
                    {!pkg.image && <CardTitle className="flex items-center gap-2">
                      {getPackageIcon(pkg.type)}
                      {pkg.name}
                    </CardTitle>}
                    {selectedPackage?.id === pkg.id && (
                      <CircleCheck className="h-6 w-6 text-hotel-primary" />
                    )}
                  </div>
                  <CardDescription>{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-500 mb-1">Starting from</div>
                    <p className="text-2xl font-bold text-hotel-primary">
                      {pkg.basePrice * 4} €
                    </p>
                    {pkg.includesStandardRoom && standardRoom && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <BedDouble className="h-4 w-4" />
                        <span>Includes Standard Room</span>
                      </div>
                    )}
                    {selectedPackage?.id === pkg.id && parseInt(duration) !== 4 && (
                      <motion.p 
                        className="text-md font-medium text-hotel-secondary mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {calculatePackagePrice(pkg.basePrice)} € for {duration} days
                      </motion.p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="bg-gray-50 p-6 rounded-lg"
      >
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
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4" className="flex items-center gap-2">
                  <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">4</span>
                  <span>Days Weekend Escape</span>
                </SelectItem>
                <SelectItem value="7" className="flex items-center gap-2">
                  <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">7</span>
                  <span>Days Complete Retreat</span>
                </SelectItem>
                <SelectItem value="14" className="flex items-center gap-2">
                  <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">14</span>
                  <span>Days Extended Wellness</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Selected Date Range
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full bg-white justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarRange className="h-5 w-5 mr-2" />
                  {startDate 
                    ? `${format(startDate, 'MMM dd, yyyy')} ${
                        endDate ? `to ${format(endDate, 'MMM dd, yyyy')}` : ''
                      }`
                    : 'Select your stay dates'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg border" align="center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Calendar
                    mode="single"
                    selected={startDate || undefined}
                    onSelect={(date) => setStartDate(date)}
                    className="rounded-md border p-3 pointer-events-auto"
                    disabled={(date) => {
                      return date < new Date();
                    }}
                    footer={
                      startDate && endDate ? (
                        <p className="p-2 text-center text-sm bg-hotel-primary/10 rounded-b-lg">
                          <span className="font-semibold">Your stay:</span> {format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')} 
                          <span className="font-semibold ml-1">({parseInt(duration)} days)</span>
                        </p>
                      ) : null
                    }
                  />
                </motion.div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="flex justify-end"
      >
        <Button 
          onClick={handleContinue}
          className="bg-hotel-primary hover:bg-hotel-primary/90"
          size="lg"
        >
          {isEditMode ? "Save Changes" : "Continue to Add-ons"}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default PackageSelection;
