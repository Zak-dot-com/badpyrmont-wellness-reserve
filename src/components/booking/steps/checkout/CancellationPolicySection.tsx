
import React from 'react';
import { useBooking } from '@/contexts/BookingContext';
import { CalendarClock, AlertCircle, Receipt, Ban, Clock, Info, CheckCircle } from 'lucide-react';
import { addDays, format, differenceInDays, differenceInMonths } from 'date-fns';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const CancellationPolicySection = () => {
  const { bookingData, calculateTotalPrice, bookingType } = useBooking();
  const totalPrice = calculateTotalPrice();
  
  // Get the reservation date and today's date
  const startDate = bookingData.startDate;
  const today = new Date();
  
  // Calculate days difference between today and start date
  const daysUntilReservation = startDate ? differenceInDays(startDate, today) : null;
  
  // Calculate if the start date is less than 3 months away (changed from 5 months)
  const isLessThanThreeMonthsAway = startDate ? differenceInMonths(startDate, today) < 3 : true;
  
  // Calculate payment dates
  const thirtyDaysBefore = startDate ? addDays(startDate, -30) : null;
  const fourteenDaysBefore = startDate ? addDays(startDate, -14) : null;
  
  // Determine payment structure based on proximity to booking date
  let immediatePaymentPercentage = 50; // Default
  let thirtyDaysPaymentPercentage = 20;
  let fourteenDaysPaymentPercentage = 30;
  let showThirtyDayPayment = true;
  let showFourteenDayPayment = true;
  
  if (daysUntilReservation !== null) {
    if (daysUntilReservation < 14) {
      // Less than 14 days before: 100% due now
      immediatePaymentPercentage = 100;
      thirtyDaysPaymentPercentage = 0;
      fourteenDaysPaymentPercentage = 0;
      showThirtyDayPayment = false;
      showFourteenDayPayment = false;
    } else if (daysUntilReservation < 30) {
      // Between 14-30 days before: 70% due now, 30% due 14 days before
      immediatePaymentPercentage = 70;
      thirtyDaysPaymentPercentage = 0;
      fourteenDaysPaymentPercentage = 30;
      showThirtyDayPayment = false;
    }
  }
  
  // Calculate payment amounts
  const initialPayment = bookingType === 'event' ? totalPrice : (totalPrice * (immediatePaymentPercentage / 100));
  const secondPayment = totalPrice * (thirtyDaysPaymentPercentage / 100);
  const finalPayment = totalPrice * (fourteenDaysPaymentPercentage / 100);

  // Get payment progress percentage
  const getProgressPercentage = () => {
    if (!daysUntilReservation) return 0;
    if (daysUntilReservation < 14) return 100;
    if (daysUntilReservation < 30) return 70;
    return 50;
  };
  
  return (
    <div className="bg-purple-50 p-6 rounded-lg border border-purple-200 space-y-4 my-8 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <CalendarClock className="h-5 w-5 text-purple-700" />
        <h3 className="text-xl font-semibold text-purple-800">Payment Schedule & Cancellation Policy</h3>
      </div>
      
      {!startDate ? (
        <div className="flex items-center gap-2 text-gray-600 italic bg-white p-4 rounded-md">
          <AlertCircle className="h-4 w-4" />
          <p>Please select a reservation date to see your payment schedule.</p>
        </div>
      ) : (
        <>
          {/* Progress indicator for payment */}
          <div className="space-y-2 mb-4">
            <div className="flex justify-between items-center text-sm">
              <span>Initial Payment</span>
              {showThirtyDayPayment && <span>30 Days Prior</span>}
              {showFourteenDayPayment && <span>14 Days Prior</span>}
            </div>
            <Progress value={getProgressPercentage()} className="h-2 bg-purple-100" />
            <p className="text-xs text-gray-500 italic">
              {getProgressPercentage()}% of payment due now
            </p>
          </div>

          {bookingType === 'event' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-white p-4 rounded-md border-l-4 border-purple-500">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Receipt className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Full Payment Required</p>
                  <div className="flex items-center gap-1 mt-1 text-purple-700 font-semibold">
                    <span className="text-lg">€{totalPrice.toFixed(2)}</span>
                    <span className="text-sm bg-purple-100 px-2 py-0.5 rounded">Due today</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Event tickets require 100% payment at the time of booking.
                  </p>
                  <p className="text-sm font-medium text-red-500 mt-2 flex items-center gap-1">
                    <Ban className="h-4 w-4" /> No cancellations or refunds are available for event bookings.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Initial Payment */}
              <div className={cn(
                "flex items-start gap-3 p-4 rounded-md border-l-4", 
                immediatePaymentPercentage === 100 ? "bg-purple-100 border-purple-600" : "bg-white border-purple-400"
              )}>
                <div className="bg-purple-100 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    {immediatePaymentPercentage === 50 ? "Initial Reservation Payment (50%)" :
                     immediatePaymentPercentage === 70 ? "Initial Payment (70%)" :
                     "Full Payment (100%)"}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-semibold text-purple-700">€{initialPayment.toFixed(2)}</span>
                    <span className="text-sm bg-purple-100 px-2 py-0.5 rounded text-purple-700">Due today</span>
                  </div>
                  
                  {isLessThanThreeMonthsAway && immediatePaymentPercentage === 50 && (
                    <div className="flex items-center gap-1 mt-1 text-amber-600 text-sm">
                      <Info className="h-4 w-4" />
                      <p>Your reservation date is less than 3 months away</p>
                    </div>
                  )}
                  
                  {daysUntilReservation && daysUntilReservation < 14 && (
                    <p className="text-sm mt-1 bg-amber-50 p-1 rounded border border-amber-200">
                      Full payment is required as your reservation is less than 14 days away.
                    </p>
                  )}
                  
                  {daysUntilReservation && daysUntilReservation >= 14 && daysUntilReservation < 30 && (
                    <p className="text-sm mt-1 bg-amber-50 p-1 rounded border border-amber-200">
                      70% payment is required as your reservation is less than 30 days away.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Second Payment - 30 days prior */}
              {showThirtyDayPayment && (
                <div className="flex items-start gap-3 bg-white p-4 rounded-md border-l-4 border-purple-300">
                  <div className="bg-purple-50 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Second Payment (20%)</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold text-purple-700">€{secondPayment.toFixed(2)}</span>
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                        {thirtyDaysBefore ? format(thirtyDaysBefore, 'MMMM d, yyyy') : '30 days before your stay'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Final Payment - 14 days prior */}
              {showFourteenDayPayment && (
                <div className="flex items-start gap-3 bg-white p-4 rounded-md border-l-4 border-purple-300">
                  <div className="bg-purple-50 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Final Payment ({fourteenDaysPaymentPercentage}%)</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-semibold text-purple-700">€{finalPayment.toFixed(2)}</span>
                      <span className="text-sm bg-gray-100 px-2 py-0.5 rounded">
                        {fourteenDaysBefore ? format(fourteenDaysBefore, 'MMMM d, yyyy') : '14 days before your stay'}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Cancellation Policy */}
              <div className="flex items-start gap-3 pt-4 mt-2 border-t border-purple-200">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Ban className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Cancellation Policy</p>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1 mt-2">
                    <li>You may cancel your reservation at any time, but no refunds will be issued for payments already processed.</li>
                    <li>Cancellations must be made in writing by contacting our customer service.</li>
                    <li className="font-medium text-amber-700">No cancellations are possible within 14 days of your reservation date.</li>
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
