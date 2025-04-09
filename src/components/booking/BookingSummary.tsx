
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { Euro } from 'lucide-react';

const BookingSummary = () => {
  const { bookingData, calculateEndDate, calculateTotalPrice } = useBooking();
  const { selectedPackage, duration, startDate, addOnCategories, selectedRoom, roomAddOns } = bookingData;
  
  const endDate = calculateEndDate();
  const totalPrice = calculateTotalPrice();
  
  const selectedAddOns = addOnCategories.flatMap(category => 
    category.items.filter(item => item.selected)
  );
  
  const selectedRoomAddOns = roomAddOns.filter(addon => addon.selected);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <h2 className="text-xl font-bold border-b pb-4 mb-4 flex items-center justify-between">
        <span>Booking Summary</span>
        <div className="text-hotel-primary flex items-center gap-1">
          <Euro className="h-5 w-5" />
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </h2>
      
      {/* Package details */}
      {selectedPackage && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Selected Package</h3>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <p className="font-medium">{selectedPackage.name}</p>
            <p className="text-sm text-gray-600">{duration} Days</p>
            <p className="text-sm text-gray-600 mt-2">
              {selectedPackage.basePrice} € per day (Total: {selectedPackage.basePrice * parseInt(duration)} €)
            </p>
          </div>
        </div>
      )}
      
      {/* Date Range */}
      {startDate && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Selected Dates</h3>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <p className="text-sm text-gray-600">
              {format(startDate, 'MMM dd, yyyy')} {endDate && `to ${format(endDate, 'MMM dd, yyyy')}`}
            </p>
            <p className="text-sm text-gray-600 mt-1">{duration} days</p>
          </div>
        </div>
      )}
      
      {/* Selected Add-ons */}
      {selectedAddOns.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Selected Add-ons</h3>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <ul className="space-y-2">
              {selectedAddOns.map(addon => (
                <li key={addon.id} className="flex justify-between text-sm">
                  <span>{addon.name}</span>
                  <span>{addon.price} €</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Selected Room */}
      {selectedRoom && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Selected Room</h3>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <p className="font-medium">{selectedRoom.name}</p>
            <p className="text-sm text-gray-600 mt-2">
              {selectedRoom.price} € per night (Total: {selectedRoom.price * parseInt(duration)} €)
            </p>
          </div>
        </div>
      )}
      
      {/* Selected Room Add-ons */}
      {selectedRoomAddOns.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold text-gray-700">Room Add-ons</h3>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <ul className="space-y-2">
              {selectedRoomAddOns.map(addon => (
                <li key={addon.id} className="flex justify-between text-sm">
                  <span>{addon.name}</span>
                  <span>{addon.price} €</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Total */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between font-bold">
          <span>Total Price</span>
          <span className="text-hotel-primary">{totalPrice.toFixed(2)} €</span>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
