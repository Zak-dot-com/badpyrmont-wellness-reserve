
import React from 'react';
import { PackageType, RoomType } from '@/types/bookingTypes';
import { SummaryItemDetail, SummaryAddOnList } from './SummaryItemDetail';
import { format } from 'date-fns';

type PackageSummaryProps = {
  selectedPackage: PackageType | null;
  selectedRoom: RoomType | null;
  selectedDuration: string;
  bookedDays: number;
  startDate: Date | null;
  selectedAddOns: string[];
  formatDate: (date: Date | null) => string;
};

const getPackageName = (packageId: string): string => {
  switch (packageId) {
    case 'relaxation-retreat':
      return 'Relaxation Retreat';
    case 'detox-revitalize':
      return 'Detox & Revitalize';
    case 'luxury-escape':
      return 'Luxury Wellness Escape';
    default:
      return packageId;
  }
};

const getRoomName = (roomId: string): string => {
  switch (roomId) {
    case 'single-standard':
      return 'Standard Room';
    case 'deluxe-room':
      return 'Deluxe Room';
    case 'vip-suite':
      return 'VIP Suite';
    default:
      return roomId;
  }
};

const getAddonName = (addonId: string): string => {
  switch (addonId) {
    case 'spa-credit':
      return 'Spa Treatment Credit';
    case 'private-training':
      return 'Private Fitness Training';
    case 'nutrition':
      return 'Nutrition Consultation';
    case 'airport-transfer':
      return 'Airport Transfer';
    case 'excursion':
      return 'Excursion Package';
    default:
      return addonId;
  }
};

export const PackageBookingSummary = ({
  selectedPackage,
  selectedRoom,
  selectedDuration,
  bookedDays,
  startDate,
  selectedAddOns,
  formatDate,
}: PackageSummaryProps) => {
  // If no package or room selected, show nothing
  if (!selectedPackage && !selectedRoom) return null;
  
  // Calculate end date based on start date and booked days
  const endDate = startDate ? new Date(startDate) : null;
  if (endDate) {
    endDate.setDate(endDate.getDate() + bookedDays);
  }

  return (
    <div className="space-y-4">
      {selectedPackage && (
        <SummaryItemDetail 
          label="Package" 
          value={<p className="font-semibold text-lg">{getPackageName(selectedPackage.id)}</p>} 
        />
      )}

      {selectedDuration && (
        <SummaryItemDetail label="Duration" value={`${selectedDuration} days`} />
      )}
      
      {/* Highlighted Stay Duration Section */}
      {bookedDays > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h4 className="font-medium text-amber-800 mb-2">Stay Details</h4>
          
          <div className="space-y-2">
            <div>
              <p className="text-sm text-gray-600">Number of Nights</p>
              <p className="font-bold text-lg">{bookedDays} nights</p>
            </div>
            
            {startDate && (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-medium">{formatDate(startDate)}</p>
                </div>
                
                {endDate && (
                  <div>
                    <p className="text-sm text-gray-600">Check-out</p>
                    <p className="font-medium">{formatDate(endDate)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {selectedRoom && (
        <SummaryItemDetail label="Room" value={getRoomName(selectedRoom.id)} />
      )}

      {selectedAddOns && selectedAddOns.length > 0 && (
        <SummaryAddOnList addons={selectedAddOns} getAddonName={getAddonName} />
      )}
    </div>
  );
};
