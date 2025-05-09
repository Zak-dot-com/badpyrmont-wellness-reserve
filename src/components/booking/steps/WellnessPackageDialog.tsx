import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, Star, ExternalLink } from "lucide-react";
import PackageSelection from "./PackageSelection";
import { useBooking } from "@/contexts/BookingContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddonDetailDialog from "./AddonDetailDialog";
import { availablePackages } from "@/data/packagesData";
import { DurationType } from "@/types/bookingTypes";

const AddOnTreatmentsContent = () => {
  const { bookingData, toggleAddOn } = useBooking();
  const [selectedAddon, setSelectedAddon] = useState<null | {
    id: string;
    name: string;
    description: string;
    price: number;
    selected: boolean; // Added missing property
    quantity: number;  // Added missing property
  }>(null);
  const [showDialog, setShowDialog] = useState(false);

  // Include all add-ons from all categories
  const addOns = bookingData.addOnCategories.flatMap((cat) => cat.items);

  const handleReadMore = (item: typeof addOns[number]) => {
    setSelectedAddon(item);
    setShowDialog(true);
  };

  return (
    <>
      <ScrollArea className="h-[400px] w-full">
        <div className="p-4 space-y-3">
          {addOns.length === 0 && <p>No extra treatments available.</p>}
          {addOns.map((item) => (
            <div key={item.id} className="flex items-start gap-3 border-b border-gray-100 pb-2">
              <input
                type="checkbox"
                checked={item.selected}
                onChange={() => toggleAddOn(item.id.split("-")[0] ?? "", item.id)}
                className="form-checkbox accent-amber-500 mt-1"
                id={`addon-dialog-${item.id}`}
              />
              <label htmlFor={`addon-dialog-${item.id}`} className="text-sm flex-1">
                <span className="font-medium">{item.name}</span>
                <div className="text-xs text-gray-700">{item.description ? item.description.slice(0, 45) : ""}{item.description && item.description.length > 45 ? "..." : ""}</div>
                <span className="text-amber-600 font-semibold">€{item.price}</span>
                {item.description && (
                  <button
                    className="ml-2 text-xs text-blue-600 hover:underline flex items-center gap-1"
                    type="button"
                    onClick={() => handleReadMore(item)}
                  >
                    Read more <ExternalLink size={12} />
                  </button>
                )}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
      <AddonDetailDialog 
        open={showDialog} 
        onOpenChange={setShowDialog} 
        addon={selectedAddon} 
        onToggleAddon={() => {
          if (selectedAddon) {
            toggleAddOn(selectedAddon.id.split("-")[0] ?? "", selectedAddon.id);
          }
        }}
        onIncreaseQuantity={() => {}}
        onDecreaseQuantity={() => {}}
      />
    </>
  );
};

// --- Custom Package Tab ---
const CustomPackageContent = () => {
  const {
    startDate,
    bookingData,
    setDuration,
    selectedPackage,
    selectPackage,
  } = useBooking();

  // Use start date, duration for default
  const duration = parseInt(bookingData.duration) || 1;
  const checkIn = startDate;
  let minDays = 1;
  let maxDays = 14;
  // If we have a startDate, maybe endDate available via BookingContext, or add 14 day max
  // For this example, let's display up to 14 days, but allow selection
  // In a real case, use check-out date minus check-in date for range.

  // Selectable packages
  const packages = availablePackages;

  const [selected, setSelected] = useState<string>(
    selectedPackage?.id || packages[0].id
  );
  const [days, setDays] = useState<number>(duration);

  // When either changes, update context instantly
  React.useEffect(() => {
    selectPackage(selected);
    
    // Fix: Cast the days string to a DurationType before setting it
    // Only allow valid duration values (4, 7, 14)
    let validDuration: DurationType = "4";
    if (days === 7) validDuration = "7";
    if (days === 14) validDuration = "14";
    
    setDuration(validDuration);
    // eslint-disable-next-line
  }, [selected, days]);

  // Get current selected package info
  const pkg = packages.find((p) => p.id === selected);

  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-bold">Customize Your Package</h3>
        <div>
          <label className="block text-sm font-medium mb-1">Choose a Package</label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full border rounded px-3 py-2 font-medium text-gray-700"
          >
            {packages.map((pkg) => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name} — €{pkg.basePrice}/day
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Nights <span className="text-xs text-gray-400">(1-{maxDays})</span>
          </label>
          <select
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value))}
            className="w-24 border rounded px-2 py-1 font-semibold"
          >
            <option value="4">4 nights</option>
            <option value="7">7 nights</option>
            <option value="14">14 nights</option>
          </select>
        </div>
        {pkg && (
          <div className="flex items-center gap-3 border-t pt-4">
            <div>
              <span className="font-medium">{pkg.name}</span>
              <div className="text-xs text-gray-600 mt-1">{pkg.description}</div>
            </div>
            <div className="ml-auto text-amber-700 font-bold text-lg">
              €{pkg.basePrice * days}
              <span className="block text-xs font-normal text-gray-500 mt-1">
                ({pkg.basePrice}/night)
              </span>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};

type Props = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
};
const WellnessPackageDialog = ({ open, onOpenChange }: Props) => {
  const [tab, setTab] = useState("package");
  
  const handleConfirm = () => {
    // Close the dialog after confirming selection
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 p-4 pb-0">
            <Star className="text-amber-500" /> Add Wellness Option
          </DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex justify-center w-full bg-white mb-0 pb-0">
            <TabsTrigger value="package" className="flex-1">Package</TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">Custom Package</TabsTrigger>
            <TabsTrigger value="addon" className="flex-1">Add-on Treatments</TabsTrigger>
          </TabsList>
          <TabsContent value="package" className="p-4">
            <ScrollArea className="h-[400px] w-full">
              <PackageSelection isEditMode />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="custom">
            <CustomPackageContent />
          </TabsContent>
          <TabsContent value="addon">
            <AddOnTreatmentsContent />
          </TabsContent>
        </Tabs>
        <div className="p-4 border-t border-gray-200 flex justify-end">
          <Button 
            onClick={handleConfirm} 
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Confirm Selection
          </Button>
        </div>
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default WellnessPackageDialog;
