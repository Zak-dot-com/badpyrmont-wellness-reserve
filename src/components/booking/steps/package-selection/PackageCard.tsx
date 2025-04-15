
import { PackageType } from "@/contexts/BookingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, Sparkles, Bath, Dumbbell, Heart, Leaf, BedDouble } from "lucide-react";
import { motion } from "framer-motion";

type PackageCardProps = {
  pkg: PackageType;
  isSelected: boolean;
  duration: string;
  standardRoom: any;
  onSelect: (packageId: string) => void;
};

export const PackageCard = ({
  pkg,
  isSelected,
  duration,
  standardRoom,
  onSelect,
}: PackageCardProps) => {
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

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card
        className={`cursor-pointer transition-all relative overflow-hidden ${
          isSelected ? 'ring-2 ring-hotel-primary' : 'hover:shadow-md'
        }`}
        onClick={() => onSelect(pkg.id)}
      >
        {pkg.image && (
          <div className="relative h-48">
            <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">{pkg.name}</h3>
              </div>
            </div>
          </div>
        )}

        <CardHeader className="pt-4 pb-2">
          <div className="flex justify-between items-start">
            {!pkg.image && (
              <CardTitle className="flex items-center gap-2">
                {getPackageIcon(pkg.type)}
                {pkg.name}
              </CardTitle>
            )}
            {isSelected && <CircleCheck className="h-6 w-6 text-hotel-primary" />}
          </div>
          <CardDescription>{pkg.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-sm text-gray-500 mb-1">Starting from</div>
            <p className="text-2xl font-bold text-hotel-primary">{pkg.basePrice * 4} €</p>
            {pkg.includesStandardRoom && standardRoom && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <BedDouble className="h-4 w-4" />
                <span>Includes Standard Room</span>
              </div>
            )}
            {isSelected && parseInt(duration) !== 4 && (
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
  );
};
