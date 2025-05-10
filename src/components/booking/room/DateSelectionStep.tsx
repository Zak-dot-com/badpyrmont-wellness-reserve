
import React from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import DateSelector from '@/components/home/DateSelector';
import { BookingData, DurationType } from '@/types/bookingTypes';

type DateSelectionStepProps = {
  bookingData: BookingData;
  setStartDate: (date: Date | null) => void;
  setDuration: (duration: DurationType) => void;
  calculateEndDate: () => Date | null;
  onContinue: () => void;
};

const DateSelectionStep = ({
  bookingData,
  setStartDate,
  setDuration,
  calculateEndDate,
  onContinue
}: DateSelectionStepProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Select Your Stay Dates</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Check-in / Check-out
            </label>
            <DateSelector 
              showRange={true} 
              startDate={bookingData.startDate} 
              endDate={calculateEndDate()} 
              onStartDateChange={setStartDate} 
              onEndDateChange={() => {}} 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duration
            </label>
            <div className="flex space-x-4">
              {['4', '7', '14'].map(day => (
                <Button 
                  key={day} 
                  type="button" 
                  variant={bookingData.duration === day ? "default" : "outline"} 
                  className={bookingData.duration === day ? "bg-amber-500 hover:bg-amber-600" : ""} 
                  onClick={() => setDuration(day as DurationType)}
                >
                  {day} {parseInt(day) === 1 ? 'day' : 'days'}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Selected Stay:</strong> {bookingData.startDate 
              ? `${format(bookingData.startDate, 'MMM dd, yyyy')} to ${calculateEndDate() 
                ? format(calculateEndDate()!, 'MMM dd, yyyy') 
                : 'Not selected'} (${bookingData.duration} days)` 
              : 'Please select your dates'}
          </p>
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={onContinue} 
            className="bg-amber-800 hover:bg-amber-900" 
            size="lg"
          >
            Continue to Room Selection
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default DateSelectionStep;
