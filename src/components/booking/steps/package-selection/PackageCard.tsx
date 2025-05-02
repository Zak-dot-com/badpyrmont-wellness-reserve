
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PackageType, RoomType } from '@/types/bookingTypes';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PackageCardProps {
  pkg: PackageType;
  isSelected: boolean;
  duration: string;
  standardRoom: RoomType | null;
  onSelect: (packageId: string) => void;
}

export const PackageCard = ({ pkg, isSelected, duration, standardRoom, onSelect }: PackageCardProps) => {
  return (
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
        </div>
        
        {pkg.includesStandardRoom && (
          <div className="mt-2 text-xs text-green-600 flex items-center">
            <Check className="h-3 w-3 mr-1" />
            Includes Standard Room
          </div>
        )}
      </div>
    </motion.div>
  );
};
