
import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { CalendarClock, AlertCircle, Receipt, Ban, Clock } from 'lucide-react';
import { addDays, format, differenceInMonths } from 'date-fns';

const CancellationPolicySection = () => {
  const { bookingData, calculateTotalPrice, bookingType } = useBooking();
  const totalPrice = calculateTotalPrice();
  
  // Calculate payment amounts
  const initialPayment = bookingType === 'event' ? totalPrice : totalPrice * 0.5;
  const secondPayment = totalPrice * 0.2;
  const finalPayment = totalPrice * 0.3;
  
  // Get the reservation date
  const startDate = bookingData.startDate;
  
  // Calculate if the start date is less than 5 months away
  const isLessThanFiveMonthsAway = startDate ? differenceInMonths(startDate, new Date()) < 5 : true;
  
  // Calculate payment dates
  const today = new Date();
  const thirtyDaysBefore = startDate ? addDays(startDate, -30) : null;
  const fourteenDaysBefore = startDate ? addDays(startDate, -14) : null;
  
  return (
    <div className="bg-amber-50 p-6 rounded-lg border border-amber-200 space-y-4 my-8">
      <div className="flex items-center gap-2 mb-2">
        <CalendarClock className="h-5 w-5 text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-800">Payment Schedule & Cancellation Policy</h3>
      </div>
      
      {!startDate ? (
        <div className="flex items-center gap-2 text-gray-600 italic">
          <AlertCircle className="h-4 w-4" />
          <p>Please select a reservation date to see your payment schedule.</p>
        </div>
      ) : (
        <>
          {bookingType === 'event' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Receipt className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Full Payment Required</p>
                  <p className="text-sm text-gray-600">
                    Event tickets require 100% payment (€{totalPrice.toFixed(2)}) at the time of booking.
                  </p>
                  <p className="text-sm font-medium text-red-500 mt-1">
                    No cancellations or refunds are available for event bookings.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Initial Payment */}
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Receipt className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Initial Reservation Payment (50%)</p>
                  <p className="text-sm text-gray-600">
                    €{initialPayment.toFixed(2)} will be charged {isLessThanFiveMonthsAway ? 'immediately' : 'at booking'}
                  </p>
                  {isLessThanFiveMonthsAway && (
                    <p className="text-xs text-amber-700 italic mt-1">
                      Your reservation date is less than 5 months away, so the initial payment will be processed immediately.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Second Payment - 30 days prior */}
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Second Payment (20%)</p>
                  <p className="text-sm text-gray-600">
                    €{secondPayment.toFixed(2)} will be charged on {thirtyDaysBefore ? format(thirtyDaysBefore, 'MMMM d, yyyy') : '30 days before your stay'}
                  </p>
                </div>
              </div>
              
              {/* Final Payment - 14 days prior */}
              <div className="flex items-start gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Final Payment (30%)</p>
                  <p className="text-sm text-gray-600">
                    €{finalPayment.toFixed(2)} will be charged on {fourteenDaysBefore ? format(fourteenDaysBefore, 'MMMM d, yyyy') : '14 days before your stay'}
                  </p>
                </div>
              </div>
              
              {/* Cancellation Policy */}
              <div className="flex items-start gap-3 pt-2 border-t border-amber-200">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Ban className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Cancellation Policy</p>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-1">
                    <li>You may cancel your reservation at any time, but no refunds will be issued for payments already processed.</li>
                    <li>Cancellations must be made in writing by contacting our customer service.</li>
                    <li>No cancellations are possible within 14 days of your reservation date.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CancellationPolicySection;
