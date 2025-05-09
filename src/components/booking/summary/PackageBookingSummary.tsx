import React from 'react';
import { PackageType, RoomType } from '@/types/bookingTypes';
import { SummaryItemDetail, SummaryAddOnList } from './SummaryItemDetail';

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

      {startDate && (
        <SummaryItemDetail label="Start Date" value={formatDate(startDate)} />
      )}

      {selectedRoom && (
        <SummaryItemDetail label="Room" value={getRoomName(selectedRoom.id)} />
      )}

      {bookedDays > 0 && (
        <SummaryItemDetail label="Stay Length" value={`${bookedDays} nights`} />
      )}

      {selectedAddOns && selectedAddOns.length > 0 && (
        <SummaryAddOnList addons={selectedAddOns} getAddonName={getAddonName} />
      )}
    </div>
  );
};
