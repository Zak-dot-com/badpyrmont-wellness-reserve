
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { PackageCard } from './package-selection/PackageCard';
import { DurationDateSelector } from './package-selection/DurationDateSelector';

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
          <h2 className="text-2xl font-bold mb-6 text-white uppercase tracking-wide">Select Your Wellness Package</h2>
        </motion.div>
      )}
      
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {availablePackages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isSelected={selectedPackage?.id === pkg.id}
              duration={duration}
              standardRoom={standardRoom}
              onSelect={selectPackage}
            />
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <DurationDateSelector
          duration={duration}
          startDate={startDate}
          endDate={endDate}
          onDurationChange={setDuration}
          onStartDateChange={setStartDate}
        />
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
