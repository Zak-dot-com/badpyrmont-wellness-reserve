
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";

type LearnMoreDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  images?: string[];
  details?: {
    label: string;
    value: string | number | React.ReactNode;
  }[];
  additionalContent?: React.ReactNode;
  type: 'package' | 'room' | 'addon';
  badge?: string;
};

const LearnMoreDialog = ({ 
  open, 
  onOpenChange,
  title,
  description,
  images = [],
  details = [],
  additionalContent,
  type,
  badge
}: LearnMoreDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 max-h-[90vh] overflow-hidden">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <DialogTitle>{title}</DialogTitle>
              {badge && <Badge className="bg-amber-500 text-white ml-2">{badge}</Badge>}
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <X className="h-4 w-4" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[calc(90vh-100px)]">
          <div className="p-4 space-y-6">
            {/* Image Gallery */}
            {images.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                  {type === 'package' ? 'What to Expect' : type === 'room' ? 'Room Preview' : 'Treatment Preview'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((image, i) => (
                    <div key={i} className="overflow-hidden rounded-md border">
                      <AspectRatio ratio={16/9}>
                        <img 
                          src={image} 
                          alt={`${title} image ${i+1}`} 
                          className="object-cover w-full h-full" 
                        />
                      </AspectRatio>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Description */}
            {description && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                  Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {description}
                </p>
              </div>
            )}
            
            {/* Details */}
            {details.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                  {type === 'package' ? 'Package Details' : type === 'room' ? 'Room Details' : 'Treatment Details'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.map((detail, i) => (
                    <div key={i} className="flex justify-between border-b pb-2">
                      <span className="text-gray-600">{detail.label}</span>
                      <span className="font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Additional Content */}
            {additionalContent && (
              <div className="space-y-3">
                {additionalContent}
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default LearnMoreDialog;
