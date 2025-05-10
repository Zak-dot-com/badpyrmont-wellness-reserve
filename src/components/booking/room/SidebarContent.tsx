
import React from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingSummary from '@/components/booking/summary/BookingSummary';

type SidebarContentProps = {
  activeStep: 'dates' | 'room' | 'checkout';
};

const SidebarContent = ({ activeStep }: SidebarContentProps) => {
  return (
    <div className="sticky top-8">
      <BookingSummary />
      
      {activeStep !== 'checkout' && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3 text-amber-700">
            <PackageCheck size={20} />
            <span className="font-medium">Looking for wellness options?</span>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Enhance your stay with our wellness packages and spa treatments.
          </p>
          <Link to="/booking?bookingType=package">
            <Button variant="outline" className="w-full mt-3 border-amber-500 text-amber-700 hover:bg-amber-50">
              Browse Wellness Packages
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SidebarContent;
