
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Package, Star } from "lucide-react";
import PackageSelection from "./PackageSelection";
import { useBooking } from "@/contexts/BookingContext";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dummy for customizing a package (replace with your real logic if needed)
const CustomPackageContent = () => (
  <ScrollArea className="h-[400px] w-full">
    <div className="p-6">
      <h3 className="text-lg font-bold mb-3">Customize Your Package</h3>
      <p>Custom package selection coming soon!</p>
    </div>
  </ScrollArea>
);

// Simple Add-on Treatments selector
const AddOnTreatmentsContent = () => {
  const { bookingData, availablePackages, toggleAddOn } = useBooking();
  // We'll just iterate add-on categories for simplicity here
  const addOns = bookingData.addOnCategories
    .flatMap((cat) => cat.items)
    .filter((item) => !["spa-credit","private-training","nutrition","airport-transfer","excursion"].includes(item.id) // example filter
  );
  return (
    <ScrollArea className="h-[400px] w-full">
      <div className="p-4 space-y-2">
        {addOns.length === 0 && <p>No extra treatments available.</p>}
        {addOns.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => toggleAddOn(item.id.split("-")[0] ?? "", item.id)}
              className="form-checkbox accent-amber-500"
              id={`addon-dialog-${item.id}`}
            />
            <label htmlFor={`addon-dialog-${item.id}`} className="text-sm">{item.name} <span className="text-amber-600">€{item.price}</span></label>
          </div>
        ))}
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
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 p-4 pb-0"><Star className="text-amber-500" /> Add Wellness Option</DialogTitle>
        </DialogHeader>
        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="flex justify-center w-full bg-white mb-0 pb-0">
            <TabsTrigger value="package" className="flex-1">Package</TabsTrigger>
            <TabsTrigger value="custom" className="flex-1">Custom Package</TabsTrigger>
            <TabsTrigger value="addon" className="flex-1">Add-on Treatments</TabsTrigger>
          </TabsList>
          <TabsContent value="package" className="p-4">
            <ScrollArea className="h-[500px] w-full">
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
        <DialogClose />
      </DialogContent>
    </Dialog>
  );
};

export default WellnessPackageDialog;
