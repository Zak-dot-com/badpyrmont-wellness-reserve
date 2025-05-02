import React, { useState } from "react";
import { useBooking } from "@/contexts/BookingContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, addHours } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Users2, Clock, BadgeDollarSign, CheckCircle2, LandPlot, Building2, MapPin, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import RoomBookingSection from "./event-space/RoomBookingSection";
import LearnMoreDialog from "@/components/dialogs/LearnMoreDialog";
import CancellationPolicy from "../CancellationPolicy";

// Define form schema
const formSchema = z.object({
  eventName: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  attendees: z.number().min(10, {
    message: "Minimum 10 attendees required.",
  }),
  eventDate: z.date({
    required_error: "An event date is required.",
  }),
  duration: z.number().min(1, {
    message: "Minimum 1 hour required.",
  }),
  eventType: z.string().min(1, {
    message: "Please select an event type.",
  }),
  notes: z.string().optional(),
  catering: z.boolean().default(false),
  audioVisual: z.boolean().default(false),
  floralDecor: z.boolean().default(false),
  roomRequired: z.boolean().default(false),
});

const EventSpaceSelection = () => {
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState("");
  const [includeRooms, setIncludeRooms] = useState(false);
  const [showVenueDetails, setShowVenueDetails] = useState<string | null>(null);
  const [roomBookingData, setRoomBookingData] = useState({
    enabled: false,
    numberOfRooms: 1,
    roomType: "single-standard",
    nights: 1,
  });

  const {
    setEventSpace,
    setEventDate,
    setAttendees,
    setEventType,
    setEventDuration,
    setEventAddons,
    setCurrentStep,
  } = useBooking();

  // Set up the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      attendees: 50,
      eventDate: new Date(),
      duration: 4,
      eventType: "",
      notes: "",
      catering: false,
      audioVisual: false,
      floralDecor: false,
      roomRequired: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!selectedVenue) {
      toast.error("Please select a venue");
      return;
    }

    // Store the values in BookingContext
    setEventSpace(selectedVenue);
    setEventDate(values.eventDate);
    setAttendees(values.attendees);
    setEventType(values.eventType);
    setEventDuration(values.duration);

    const addons = [];
    if (values.catering) addons.push("catering");
    if (values.audioVisual) addons.push("av");
    if (values.floralDecor) addons.push("decor");
    setEventAddons(addons);

    // Store event booking data in SessionStorage for checkout
    const eventData = {
      ...values,
      venue: selectedVenue,
      addons,
      includeRooms: values.roomRequired,
    };
    sessionStorage.setItem("eventBooking", JSON.stringify(eventData));

    // Navigate to checkout
    toast.success("Event details saved successfully!");
    setCurrentStep(4);
  };

  const venueOptions = [
    {
      id: "garden-pavilion",
      name: "Garden Pavilion",
      capacity: 80,
      pricePerHour: 200,
      description:
        "An elegant open-air structure surrounded by lush gardens, perfect for intimate events and celebrations.",
      features: ["Natural daylight", "Garden views", "Open-air structure", "Special lighting"],
      images: [
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"
      ]
    },
    {
      id: "grand-ballroom",
      name: "Grand Ballroom",
      capacity: 200,
      pricePerHour: 500,
      description: "Our largest venue with high ceilings, chandeliers, and state-of-the-art sound system.",
      features: ["High ceilings", "Chandeliers", "Sound system", "Stage area", "Dance floor"],
      images: [
        "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=800",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800"
      ]
    },
    {
      id: "executive-hall",
      name: "Executive Hall",
      capacity: 50,
      pricePerHour: 300,
      description:
        "A sophisticated space with modern amenities, perfect for corporate events and meetings.",
      features: ["Boardroom setup", "Video conferencing", "Presentation equipment", "Executive chairs"],
      images: [
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800",
        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?w=800"
      ]
    },
  ];

  const getVenueIcon = (venueId: string) => {
    switch (venueId) {
      case "garden-pavilion":
        return <LandPlot className="h-5 w-5 text-green-600" />;
      case "grand-ballroom":
        return <Building2 className="h-5 w-5 text-purple-600" />;
      case "executive-hall":
        return <MapPin className="h-5 w-5 text-blue-600" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  const attendeesValue = form.watch("attendees");
  const durationValue = form.watch("duration");
  const roomRequired = form.watch("roomRequired");

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Book Your Event Space</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <FormField
                control={form.control}
                name="eventName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter event name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="eventType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-wrap gap-4"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="corporate" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Corporate</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="wedding" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Wedding</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="celebration" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Celebration</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" />
                          </FormControl>
                          <FormLabel className="font-normal cursor-pointer">Other</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Venue Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venueOptions.map((venue) => (
                <Card
                  key={venue.id}
                  className={cn(
                    "cursor-pointer transition-all",
                    selectedVenue === venue.id
                      ? "ring-2 ring-amber-500"
                      : "border hover:border-amber-300"
                  )}
                  onClick={() => setSelectedVenue(venue.id)}
                >
                  <CardContent className="p-4 relative">
                    {selectedVenue === venue.id && (
                      <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-green-500" />
                    )}
                    <div className="flex items-start gap-3">
                      {getVenueIcon(venue.id)}
                      <div>
                        <CardTitle className="text-lg">{venue.name}</CardTitle>
                        <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                          {venue.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Users2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">Up to {venue.capacity} guests</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <BadgeDollarSign className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">€{venue.pricePerHour}/hour</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-full mt-3 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowVenueDetails(venue.id);
                      }}
                    >
                      <Info className="h-3 w-3 mr-1" /> View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="eventDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <FormField
                control={form.control}
                name="attendees"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Number of Attendees</FormLabel>
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">10</span>
                        <span className="text-sm font-medium">{attendeesValue}</span>
                        <span className="text-sm">200</span>
                      </div>
                      <FormControl>
                        <Slider
                          min={10}
                          max={200}
                          step={1}
                          defaultValue={[value]}
                          onValueChange={(vals) => onChange(vals[0])}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div>
            <FormField
              control={form.control}
              name="duration"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormLabel>Event Duration (hours)</FormLabel>
                  <div className="flex flex-col space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">1 hour</span>
                      <span className="text-sm font-medium">
                        {durationValue} hour{durationValue > 1 ? "s" : ""}
                      </span>
                      <span className="text-sm">12 hours</span>
                    </div>
                    <FormControl>
                      <Slider
                        min={1}
                        max={12}
                        step={1}
                        defaultValue={[value]}
                        onValueChange={(vals) => onChange(vals[0])}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Additional Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="catering"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-amber-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">Catering Services</FormLabel>
                      <p className="text-sm text-gray-500">
                        Full-service catering options (€50 per person)
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="audioVisual"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-amber-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">Audio/Visual Equipment</FormLabel>
                      <p className="text-sm text-gray-500">
                        Premium AV setup with technician (€300)
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="floralDecor"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-amber-500"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-medium">Floral Decorations</FormLabel>
                      <p className="text-sm text-gray-500">
                        Custom floral arrangements (€200)
                      </p>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="roomRequired"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md bg-gray-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      field.onChange(checked);
                      setIncludeRooms(!!checked);
                    }}
                    className="data-[state=checked]:bg-amber-500"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">Include Accommodation</FormLabel>
                  <p className="text-sm text-gray-500">
                    Add rooms for event attendees at special group rates
                  </p>
                </div>
              </FormItem>
            )}
          />

          {roomRequired && (
            <RoomBookingSection 
              attendees={attendeesValue} 
              onRoomBookingChange={handleRoomBookingChange} 
            />
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests</FormLabel>
                <FormControl>
                  <textarea
                    className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Any special requirements or requests for your event..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CancellationPolicy showFull={true} />

          <div className="pt-4">
            <Button type="submit" size="lg" className="bg-amber-800 hover:bg-amber-900">
              Continue to Checkout
            </Button>
          </div>
        </form>
      </Form>
      
      {/* Venue Details Dialogs */}
      {venueOptions.map((venue) => (
        <LearnMoreDialog
          key={venue.id}
          open={showVenueDetails === venue.id}
          onOpenChange={(isOpen) => setShowVenueDetails(isOpen ? venue.id : null)}
          title={venue.name}
          description={venue.description}
          images={venue.images}
          details={[
            { label: 'Capacity', value: `${venue.capacity} guests` },
            { label: 'Price', value: `€${venue.pricePerHour}/hour` },
            { label: 'Availability', value: 'Check with venue' }
          ]}
          additionalContent={
            <>
              <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                Venue Features
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {venue.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
              
              <div className="mt-4">
                <h3 className="font-medium text-sm text-gray-500 uppercase tracking-wide">
                  Venue Policy
                </h3>
                <p className="text-gray-700 mt-2">
                  The venue must be booked at least 2 weeks in advance. A 25% deposit is required to confirm your booking.
                </p>
              </div>
            </>
          }
          type="room"
        />
      ))}
    </div>
  );
};

export default EventSpaceSelection;
