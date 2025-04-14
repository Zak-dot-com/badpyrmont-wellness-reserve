
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarRange } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

type DurationDateSelectorProps = {
  duration: string;
  startDate: Date | null;
  endDate: Date | null;
  onDurationChange: (value: "4" | "7" | "14") => void;
  onStartDateChange: (date: Date | null) => void;
};

export const DurationDateSelector = ({
  duration,
  startDate,
  endDate,
  onDurationChange,
  onStartDateChange,
}: DurationDateSelectorProps) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-6">Choose Your Duration & Dates</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Package Duration</label>
          <Select value={duration} onValueChange={(value) => onDurationChange(value as "4" | "7" | "14")}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4" className="flex items-center gap-2">
                <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                  4
                </span>
                <span>Days Weekend Escape</span>
              </SelectItem>
              <SelectItem value="7" className="flex items-center gap-2">
                <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                  7
                </span>
                <span>Days Complete Retreat</span>
              </SelectItem>
              <SelectItem value="14" className="flex items-center gap-2">
                <span className="bg-hotel-primary/10 text-hotel-primary w-8 h-8 rounded-full flex items-center justify-center font-semibold">
                  14
                </span>
                <span>Days Extended Wellness</span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Selected Date Range</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full bg-white justify-start text-left font-normal",
                  !startDate ? "text-muted-foreground" : "text-gray-900" // Make selected date text black
                )}
              >
                <CalendarRange className="h-5 w-5 mr-2" />
                {startDate
                  ? `${format(startDate, 'MMM dd, yyyy')} ${endDate ? `to ${format(endDate, 'MMM dd, yyyy')}` : ''}`
                  : 'Select your stay dates'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white shadow-lg rounded-lg border pointer-events-auto" align="center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={(date) => onStartDateChange(date)}
                  className="rounded-md border p-3 pointer-events-auto"
                  disabled={(date) => {
                    return date < new Date();
                  }}
                  footer={
                    startDate && endDate ? (
                      <p className="p-2 text-center text-sm bg-hotel-primary/10 rounded-b-lg">
                        <span className="font-semibold">Your stay:</span> {format(startDate, 'MMM dd')} -{' '}
                        {format(endDate, 'MMM dd, yyyy')}
                        <span className="font-semibold ml-1">({duration} days)</span>
                      </p>
                    ) : null
                  }
                />
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
