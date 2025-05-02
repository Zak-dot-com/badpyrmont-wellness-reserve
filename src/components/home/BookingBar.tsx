
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar as CalendarIcon,
  Bed,
  Sparkles,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DateSelector from "./DateSelector";
import { motion } from "framer-motion";

type BookingType = "room" | "package" | "event";

const BookingBar = () => {
  const [bookingType, setBookingType] = useState<BookingType>("room");
  const [numGuests, setNumGuests] = useState<string>("1");
  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 1))
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [eventSpace, setEventSpace] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Construct URL with query parameters
    const searchParams = new URLSearchParams();
    
    if (bookingType === "room" || bookingType === "package") {
      if (startDate) {
        searchParams.append("startDate", startDate.toISOString());
      }
      if (endDate) {
        searchParams.append("endDate", endDate.toISOString());
      }
      searchParams.append("bookingType", bookingType);
      
      if (bookingType === "room") {
        navigate(`/room-booking?${searchParams.toString()}`);
      } else {
        navigate(`/booking?${searchParams.toString()}`);
      }
    } 
    else if (bookingType === "event") {
      if (eventSpace) {
        searchParams.append("event", eventSpace);
      }
      searchParams.append("bookingType", "event");
      navigate(`/booking?${searchParams.toString()}`);
    }
  };

  // Get booking type text for dropdown
  const getBookingTypeText = () => {
    switch (bookingType) {
      case "room":
        return "Room";
      case "package":
        return "Package";
      case "event":
        return "Event Space";
      default:
        return "Select Type";
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-gray-100 p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          Book Your Wellness Journey
        </h3>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Booking Type
          </label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-between font-normal bg-white"
              >
                {getBookingTypeText()}
                <span className="ml-2 opacity-70">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px] bg-white">
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setBookingType("room");
                  setEventSpace(null);
                }}
              >
                <Bed className="mr-2 h-4 w-4" /> Room
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  setBookingType("package");
                  setEventSpace(null);
                }}
              >
                <Sparkles className="mr-2 h-4 w-4" /> Wellness Package
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setBookingType("event")}
              >
                <Users className="mr-2 h-4 w-4" /> Event Space
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {(bookingType === "room" || bookingType === "package") && (
          <>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Check-in / Check-out
              </label>
              <DateSelector
                showRange={true}
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <Select
                defaultValue="1"
                onValueChange={setNumGuests}
              >
                <SelectTrigger className="w-full bg-white">
                  <SelectValue placeholder="Select guests" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </>
        )}

        {bookingType === "event" && (
          <>
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Space
              </label>
              <Select 
                onValueChange={setEventSpace}
                defaultValue=""
              >
                <SelectTrigger className="w-full bg-white">
                  <div className="text-gray-100">
                    <SelectValue placeholder="Select venue" className="text-gray-100" />
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="garden-pavilion">Garden Pavilion</SelectItem>
                  <SelectItem value="grand-ballroom">Grand Ballroom</SelectItem>
                  <SelectItem value="executive-hall">Executive Hall</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Date
              </label>
              <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !startDate && "text-gray-500"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setShowDatePicker(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
          </>
        )}
       
        <motion.div variants={itemVariants} className={cn(
          "flex items-end",
          (bookingType === "room" || bookingType === "package") ? "md:col-span-2 lg:col-span-1" : "md:col-span-2"
        )}>
          <Button
            onClick={handleBookNow}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white mt-0"
            size="lg"
          >
            Book Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingBar;
