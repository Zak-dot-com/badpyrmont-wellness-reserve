
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { Euro, Edit2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import PackageSelection from './steps/PackageSelection';
import AddOnSelection from './steps/AddOnSelection';
import RoomSelection from './steps/RoomSelection';
import { useMediaQuery } from '@/hooks/use-media-query';

const BookingSummary = () => {
  const { bookingData, calculateEndDate, calculateTotalPrice } = useBooking();
  const { selectedPackage, duration, startDate, addOnCategories, selectedRoom, roomAddOns } = bookingData;
  
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [openAddonsDialog, setOpenAddonsDialog] = useState(false);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
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
        <div className="text-amber-600 flex items-center gap-1">
          <Euro className="h-5 w-5" />
          <span>{totalPrice.toFixed(2)}</span>
        </div>
      </h2>
      
      {/* Package details */}
      {selectedPackage && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Package</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={() => setOpenPackageDialog(true)}
            >
              <Edit2 className="h-4 w-4 text-amber-500" />
              <span className="sr-only">Edit package</span>
            </Button>
          </div>
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
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Add-ons</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={() => setOpenAddonsDialog(true)}
            >
              <Edit2 className="h-4 w-4 text-amber-500" />
              <span className="sr-only">Edit add-ons</span>
            </Button>
          </div>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <ul className="space-y-2">
              {selectedAddOns.map(addon => (
                <li key={addon.id} className="flex justify-between text-sm">
                  <span>
                    {addon.name} 
                    {addon.quantity > 1 && <span className="text-gray-500 ml-1">x{addon.quantity}</span>}
                  </span>
                  <span>{(addon.price * addon.quantity)} €</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Selected Room */}
      {selectedRoom && (
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Room</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto" 
              onClick={() => setOpenRoomDialog(true)}
            >
              <Edit2 className="h-4 w-4 text-amber-500" />
              <span className="sr-only">Edit room</span>
            </Button>
          </div>
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
          <span className="text-amber-600">{totalPrice.toFixed(2)} €</span>
        </div>
      </div>

      {/* Edit dialogs/sheets - use Dialog for desktop and Sheet for mobile */}
      {isDesktop ? (
        <>
          <Dialog open={openPackageDialog} onOpenChange={setOpenPackageDialog}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Package Selection</DialogTitle>
              </DialogHeader>
              <PackageSelection isEditMode={true} onEditComplete={() => setOpenPackageDialog(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openAddonsDialog} onOpenChange={setOpenAddonsDialog}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Add-ons</DialogTitle>
              </DialogHeader>
              <AddOnSelection isEditMode={true} onEditComplete={() => setOpenAddonsDialog(false)} />
            </DialogContent>
          </Dialog>

          <Dialog open={openRoomDialog} onOpenChange={setOpenRoomDialog}>
            <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Room Selection</DialogTitle>
              </DialogHeader>
              <RoomSelection isEditMode={true} onEditComplete={() => setOpenRoomDialog(false)} />
            </DialogContent>
          </Dialog>
        </>
      ) : (
        <>
          <Sheet open={openPackageDialog} onOpenChange={setOpenPackageDialog}>
            <SheetContent className="w-full sm:max-w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Package Selection</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <PackageSelection isEditMode={true} onEditComplete={() => setOpenPackageDialog(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={openAddonsDialog} onOpenChange={setOpenAddonsDialog}>
            <SheetContent className="w-full sm:max-w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Add-ons</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <AddOnSelection isEditMode={true} onEditComplete={() => setOpenAddonsDialog(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Sheet open={openRoomDialog} onOpenChange={setOpenRoomDialog}>
            <SheetContent className="w-full sm:max-w-full overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Edit Room Selection</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <RoomSelection isEditMode={true} onEditComplete={() => setOpenRoomDialog(false)} />
              </div>
            </SheetContent>
          </Sheet>
        </>
      )}
    </div>
  );
};

export default BookingSummary;
