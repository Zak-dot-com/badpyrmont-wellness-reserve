
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AddonDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addon: {
    id: string;
    name: string;
    description: string;
    price: number;
  } | null;
};
const AddonDetailDialog: React.FC<AddonDetailDialogProps> = ({ open, onOpenChange, addon }) => {
  if (!addon) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">{addon.name}</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="mb-2">{addon.description}</p>
          <div className="text-amber-600 font-semibold">
            €{addon.price.toFixed(2)}
          </div>
        </div>
        <DialogClose asChild>
          <Button variant="secondary" className="w-full mt-4">Close</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
export default AddonDetailDialog;
