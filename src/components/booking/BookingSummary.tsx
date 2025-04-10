
import { useBooking } from '@/contexts/BookingContext';
import { format } from 'date-fns';
import { Euro, Edit2, Trash2, BedDouble, ArrowUpCircle } from 'lucide-react';
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
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const BookingSummary = () => {
  const { 
    bookingData, 
    calculateEndDate, 
    calculateTotalPrice, 
    removeAddOn,
    removeRoomAddOn,
    resetPackage,
    resetRoom,
    getRoomUpgradePrice,
    getStandardRoom
  } = useBooking();
  
  const { 
    selectedPackage, 
    duration, 
    startDate, 
    addOnCategories, 
    selectedRoom, 
    roomAddOns 
  } = bookingData;
  
  const [openPackageDialog, setOpenPackageDialog] = useState(false);
  const [openAddonsDialog, setOpenAddonsDialog] = useState(false);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [removeAddOnDialog, setRemoveAddOnDialog] = useState<{open: boolean, categoryId: string, itemId: string}>({
    open: false,
    categoryId: '',
    itemId: ''
  });
  const [removeRoomAddOnDialog, setRemoveRoomAddOnDialog] = useState<{open: boolean, addOnId: string}>({
    open: false,
    addOnId: ''
  });
  const [removePackageDialog, setRemovePackageDialog] = useState(false);
  const [removeRoomDialog, setRemoveRoomDialog] = useState(false);
  
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  const endDate = calculateEndDate();
  const totalPrice = calculateTotalPrice();
  
  const selectedAddOns = addOnCategories.flatMap(category => 
    category.items.filter(item => item.selected)
  );
  
  const selectedRoomAddOns = roomAddOns.filter(addon => addon.selected);
  const standardRoom = getStandardRoom();
  const isRoomIncluded = selectedRoom?.isStandard && selectedPackage?.includesStandardRoom;
  const roomUpgradePrice = selectedRoom && !selectedRoom.isStandard ? getRoomUpgradePrice(selectedRoom.id) : 0;

  const handleRemoveAddOn = () => {
    if (removeAddOnDialog.categoryId && removeAddOnDialog.itemId) {
      removeAddOn(removeAddOnDialog.categoryId, removeAddOnDialog.itemId);
      setRemoveAddOnDialog({ open: false, categoryId: '', itemId: '' });
      toast.success("Add-on removed successfully");
    }
  };

  const handleRemoveRoomAddOn = () => {
    if (removeRoomAddOnDialog.addOnId) {
      removeRoomAddOn(removeRoomAddOnDialog.addOnId);
      setRemoveRoomAddOnDialog({ open: false, addOnId: '' });
      toast.success("Room add-on removed successfully");
    }
  };

  const handleRemovePackage = () => {
    resetPackage();
    setRemovePackageDialog(false);
    toast.success("Package removed successfully");
  };

  const handleRemoveRoom = () => {
    resetRoom();
    setRemoveRoomDialog(false);
    toast.success("Room removed successfully");
  };

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
        <div className="mb-4 group relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Package</h3>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => setOpenPackageDialog(true)}
                    >
                      <Edit2 className="h-4 w-4 text-amber-500" />
                      <span className="sr-only">Edit package</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit package</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => setRemovePackageDialog(true)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove package</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove package</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <p className="font-medium">{selectedPackage.name}</p>
            <p className="text-sm text-gray-600">{duration} Days</p>
            {selectedPackage.includesStandardRoom && standardRoom && (
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                <BedDouble className="h-4 w-4" />
                <span>Includes Standard Room</span>
              </div>
            )}
            <p className="text-sm text-gray-600 mt-2">
              {selectedPackage.basePrice * parseInt(duration)} € total
            </p>
          </div>
        </div>
      )}
      
      {/* Date Range */}
      {startDate && (
        <div className="mb-4 group relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Dates</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => setOpenPackageDialog(true)}
                  >
                    <Edit2 className="h-4 w-4 text-amber-500" />
                    <span className="sr-only">Edit dates</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit dates</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
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
        <div className="mb-4 group relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Add-ons</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => setOpenAddonsDialog(true)}
                  >
                    <Edit2 className="h-4 w-4 text-amber-500" />
                    <span className="sr-only">Edit add-ons</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit add-ons</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <ul className="space-y-2">
              {selectedAddOns.map(addon => {
                const categoryId = addOnCategories.find(category => 
                  category.items.some(item => item.id === addon.id)
                )?.id || '';

                return (
                  <li key={addon.id} className="flex justify-between text-sm group/item">
                    <span>
                      {addon.name} 
                      {addon.quantity > 1 && <span className="text-gray-500 ml-1">x{addon.quantity}</span>}
                    </span>
                    <div className="flex items-center">
                      <span className="mr-2">{(addon.price * addon.quantity)} €</span>
                      <div className="flex opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="p-1 h-6 w-6"
                                onClick={() => setRemoveAddOnDialog({
                                  open: true, 
                                  categoryId, 
                                  itemId: addon.id
                                })}
                              >
                                <Trash2 className="h-3 w-3 text-red-500" />
                                <span className="sr-only">Remove add-on</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Remove add-on</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      
      {/* Selected Room */}
      {selectedRoom && (
        <div className="mb-4 group relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Selected Room</h3>
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => setOpenRoomDialog(true)}
                    >
                      <Edit2 className="h-4 w-4 text-amber-500" />
                      <span className="sr-only">Edit room</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit room</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                      onClick={() => setRemoveRoomDialog(true)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Remove room</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove room</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <div className="flex justify-between items-start">
              <p className="font-medium">{selectedRoom.name}</p>
              {isRoomIncluded && (
                <Badge className="bg-green-500 text-xs">Included</Badge>
              )}
            </div>
            
            {!isRoomIncluded && (
              <div className="mt-2">
                {selectedPackage?.includesStandardRoom ? (
                  <div className="flex items-center gap-1 text-sm text-amber-600">
                    <ArrowUpCircle className="h-4 w-4" />
                    <span>Upgrade fee: {roomUpgradePrice * parseInt(duration)} € total</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600">
                    {selectedRoom.price} € per night (Total: {selectedRoom.price * parseInt(duration)} €)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Selected Room Add-ons */}
      {selectedRoomAddOns.length > 0 && (
        <div className="mb-4 group relative">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-700">Room Add-ons</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity" 
                    onClick={() => setOpenRoomDialog(true)}
                  >
                    <Edit2 className="h-4 w-4 text-amber-500" />
                    <span className="sr-only">Edit room add-ons</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit room add-ons</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="bg-gray-50 p-3 rounded mt-2">
            <ul className="space-y-2">
              {selectedRoomAddOns.map(addon => (
                <li key={addon.id} className="flex justify-between text-sm group/item">
                  <span>{addon.name}</span>
                  <div className="flex items-center">
                    <span className="mr-2">{addon.price} €</span>
                    <div className="flex opacity-0 group-hover/item:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-1 h-6 w-6" 
                              onClick={() => setRemoveRoomAddOnDialog({
                                open: true, 
                                addOnId: addon.id
                              })}
                            >
                              <Trash2 className="h-3 w-3 text-red-500" />
                              <span className="sr-only">Remove room add-on</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remove room add-on</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
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
      
      {/* Confirmation dialogs for removing items */}
      <AlertDialog 
        open={removeAddOnDialog.open} 
        onOpenChange={(open) => !open && setRemoveAddOnDialog(prev => ({...prev, open}))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Add-on</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this add-on from your booking?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemoveAddOn}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog 
        open={removeRoomAddOnDialog.open} 
        onOpenChange={(open) => !open && setRemoveRoomAddOnDialog(prev => ({...prev, open}))}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Room Add-on</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove this room add-on from your booking?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemoveRoomAddOn}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog 
        open={removePackageDialog} 
        onOpenChange={setRemovePackageDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Package</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the selected package from your booking? 
              This will reset your booking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemovePackage}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <AlertDialog 
        open={removeRoomDialog} 
        onOpenChange={setRemoveRoomDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Room</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove the selected room from your booking?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleRemoveRoom}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingSummary;
