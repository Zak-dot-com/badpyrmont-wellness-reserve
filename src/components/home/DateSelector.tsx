
import React from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarRange } from 'lucide-react';
import { cn } from '@/lib/utils';

type DateSelectorProps = {
  showRange: boolean;
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
};

const DateSelector = ({ 
  showRange, 
  startDate, 
  endDate, 
  onStartDateChange, 
  onEndDateChange 
}: DateSelectorProps) => {
  // For range selection
  const handleRangeSelect = (date: Date | null) => {
    if (!startDate) {
      onStartDateChange(date);
    } else if (date && date > startDate && !endDate) {
      onEndDateChange(date);
    } else {
      onStartDateChange(date);
      onEndDateChange(null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {showRange ? 'Check-in / Check-out' : 'Select Start Date'}
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full bg-white justify-start text-left font-normal",
              !startDate && "text-gray-500"
            )}
          >
            <CalendarRange className="h-4 w-4 mr-2" />
            {startDate
              ? showRange
                ? `${format(startDate, 'MMM dd, yyyy')}${endDate ? ` to ${format(endDate, 'MMM dd, yyyy')}` : ''}`
                : format(startDate, 'MMM dd, yyyy')
              : showRange ? 'Select check-in/out dates' : 'Select start date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg border pointer-events-auto" align="center">
          {showRange ? (
            <div className="p-3">
              <p className="mb-2 text-sm text-gray-600">
                {!startDate ? 'Select check-in date' : !endDate ? 'Select check-out date' : 'Your stay dates'}
              </p>
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={handleRangeSelect}
                className="rounded-md border pointer-events-auto"
                disabled={(date) => {
                  // Disable dates in the past
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                footer={
                  startDate && endDate ? (
                    <p className="p-2 text-center text-sm bg-hotel-primary/10 rounded-b-lg">
                      <span className="font-semibold">Your stay:</span>{' '}
                      {format(startDate, 'MMM dd')} - {format(endDate, 'MMM dd, yyyy')}
                    </p>
                  ) : null
                }
              />
            </div>
          ) : (
            <Calendar
              mode="single"
              selected={startDate || undefined}
              onSelect={(date) => onStartDateChange(date)}
              className="p-3 rounded-md border pointer-events-auto"
              disabled={(date) => {
                // Disable dates in the past
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date < today;
              }}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateSelector;
