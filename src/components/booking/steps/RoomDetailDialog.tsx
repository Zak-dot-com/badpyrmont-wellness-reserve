
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RoomType } from "@/types/bookingTypes";
import { roomDetailsData } from "@/data/roomDetailsData";
import { BedDouble, Maximize2, Info, Image, Scroll } from "lucide-react";
import { motion } from "framer-motion";

type RoomDetailDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: RoomType | null;
  onSelectRoom?: () => void;
  isSelected?: boolean;
};

const RoomDetailDialog = ({
  open,
  onOpenChange,
  room,
  onSelectRoom,
  isSelected = false
}: RoomDetailDialogProps) => {
  const [activeImage, setActiveImage] = useState<string>('balcony');
  
  if (!room) return null;
  
  // Make sure we're using the correct ID to look up room details
  const roomId = room.id.replace('room', ''); // Handle any inconsistencies in IDs
  const roomDetails = roomDetailsData[roomId as keyof typeof roomDetailsData] || 
                     roomDetailsData[room.id as keyof typeof roomDetailsData];
  
  if (!roomDetails) {
    console.error(`No room details found for room ID: ${room.id}`);
    return null;
  }

  const imageKeys = Object.keys(roomDetails.images);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden max-h-[90vh]">
        <DialogHeader className="sr-only">
          <DialogTitle>{room.name} Details</DialogTitle>
          <DialogDescription>View details and amenities for {room.name}</DialogDescription>
        </DialogHeader>
        
        <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-white/80 p-1 opacity-70 shadow-sm transition-opacity hover:opacity-100" />
        
        <ScrollArea className="max-h-[90vh] overflow-auto">
          <div className="relative">
            <AspectRatio ratio={16/9} className="bg-muted max-h-[200px]">
              {roomDetails.images[activeImage] && (
                <img
                  src={roomDetails.images[activeImage]}
                  alt={`${room.name} - ${activeImage}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent h-24">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Badge className="bg-amber-500 text-white font-medium px-2 py-1">
                    {room.type === 'single' ? 'Superior' : room.type === 'deluxe' ? 'Deluxe' : 'Junior Suite'}
                  </Badge>
                  <span className="text-white font-bold drop-shadow-md">{room.name}</span>
                </div>
              </div>
            </AspectRatio>

            <div className="absolute bottom-4 right-4 flex gap-2">
              {imageKeys.map((imgKey) => (
                <motion.button
                  key={imgKey}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-8 h-8 rounded-md overflow-hidden border-2 ${
                    activeImage === imgKey ? 'border-amber-500 shadow-lg' : 'border-white/40'
                  }`}
                  onClick={() => setActiveImage(imgKey)}
                >
                  <img 
                    src={roomDetails.images[imgKey]} 
                    alt={imgKey} 
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          <div className="p-6">
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Room Details
                </TabsTrigger>
                <TabsTrigger value="amenities" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Amenities & Features
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-amber-800">{room.name}</h3>
                  <p className="text-gray-600 mt-2">{roomDetails.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <Maximize2 className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Room Dimensions</p>
                      <p className="font-medium">{roomDetails.dimensions}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                    <BedDouble className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm text-gray-500">Bed Configuration</p>
                      <p className="font-medium">{roomDetails.bedSize}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <p className="font-bold text-gray-700">Price</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">
                    {room.price}€ <span className="text-sm text-gray-500 font-normal">/ night</span>
                  </p>
                </div>

                <div className="pt-4">
                  {onSelectRoom && (
                    <Button
                      onClick={() => {
                        onSelectRoom();
                        onOpenChange(false);
                      }}
                      className={`w-full ${
                        isSelected 
                          ? "bg-green-600 hover:bg-green-700 text-white" 
                          : "bg-amber-600 hover:bg-amber-700 text-white"
                      }`}
                    >
                      {isSelected ? "Room Selected" : "Select This Room"}
                    </Button>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="amenities">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-amber-800">Room Amenities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4">
                    {roomDetails.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                        <span className="text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailDialog;
