
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackageType, RoomType } from '@/types/bookingTypes';
import { cn } from '@/lib/utils';
import { Check, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LearnMoreDialog from '@/components/dialogs/LearnMoreDialog';

interface PackageCardProps {
  pkg: PackageType;
  isSelected: boolean;
  duration: string;
  standardRoom: RoomType | null;
  onSelect: (packageId: string) => void;
}

export const PackageCard = ({ pkg, isSelected, duration, standardRoom, onSelect }: PackageCardProps) => {
  const [showLearnMore, setShowLearnMore] = useState(false);
  
  // Set up package details for the learn more dialog
  const packageImages = [
    pkg.image || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800',
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800',
    'https://images.unsplash.com/photo-1531685250784-7569952593d2?w=800'
  ];
  
  const packageDetails = [
    { label: 'Duration', value: `${duration} days` },
    { label: 'Daily Price', value: `€${pkg.basePrice}` },
    { label: 'Total Price', value: `€${pkg.basePrice * parseInt(duration)}` },
    { label: 'Room Included', value: pkg.includesStandardRoom ? 'Standard Room' : 'Not Included' },
    { label: 'Type', value: pkg.type.charAt(0).toUpperCase() + pkg.type.slice(1) }
  ];

  // Additional package details
  const additionalContent = (
    <>
      <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
        Included Treatments
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {pkg.type === 'relaxation' && (
          <>
            <li>Daily massage therapy (60 min)</li>
            <li>Aromatherapy sessions</li>
            <li>Guided meditation</li>
            <li>Stress management consultation</li>
          </>
        )}
        {pkg.type === 'wellness' && (
          <>
            <li>Detox diet plan</li>
            <li>Daily infrared sauna session</li>
            <li>Lymphatic drainage massage</li>
            <li>Nutrition consultation</li>
          </>
        )}
        {pkg.type === 'fitness' && (
          <>
            <li>Personal training sessions</li>
            <li>Recovery massage</li>
            <li>Fitness assessment</li>
            <li>Custom workout plan</li>
          </>
        )}
        {pkg.type === 'rejuvenation' && (
          <>
            <li>Premium spa treatments</li>
            <li>Personalized wellness plan</li>
            <li>Exclusive amenities</li>
            <li>Private wellness concierge</li>
          </>
        )}
      </ul>
      
      {pkg.includesStandardRoom && standardRoom && (
        <div className="mt-4">
          <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide mb-2">
            Included Room
          </h3>
          <div className="border rounded-md overflow-hidden">
            <img 
              src={standardRoom.image}
              alt={standardRoom.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3">
              <h4 className="font-medium">{standardRoom.name}</h4>
              <p className="text-sm text-gray-600">{standardRoom.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );

  return (
    <>
      <motion.div 
        className={cn(
          "border rounded-lg p-5 cursor-pointer transition-all",
          isSelected 
            ? "border-amber-500 shadow-lg shadow-amber-100" 
            : "border-gray-200 hover:border-amber-200"
        )}
        onClick={() => onSelect(pkg.id)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
        data-testid={`package-card-${pkg.id}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold">{pkg.name}</h3>
            <p className="text-gray-600 text-sm">{pkg.description}</p>
          </div>
          {isSelected && (
            <span className="bg-green-500 text-white p-1 rounded-full">
              <Check className="h-4 w-4" />
            </span>
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-3 mt-3">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-gray-500">Price per day</p>
              <p className="text-amber-600 text-xl font-bold">€{pkg.basePrice}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-xs border-amber-500 text-amber-700 hover:bg-amber-50"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLearnMore(true);
                }}
              >
                <Info className="mr-1 h-3 w-3" />
                Learn More
              </Button>
            </div>
          </div>
          
          {pkg.includesStandardRoom && (
            <div className="mt-2 text-xs text-green-600 flex items-center">
              <Check className="h-3 w-3 mr-1" />
              Includes Standard Room
            </div>
          )}
        </div>
      </motion.div>
      
      <LearnMoreDialog
        open={showLearnMore}
        onOpenChange={setShowLearnMore}
        title={pkg.name}
        description={pkg.description}
        images={packageImages}
        details={packageDetails}
        additionalContent={additionalContent}
        type="package"
        badge={pkg.type.toUpperCase()}
      />
    </>
  );
};
