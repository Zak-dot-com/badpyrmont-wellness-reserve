
import { BookingData } from "../types/bookingTypes";
import { initialAddOnCategories } from "./addonsData";
import { initialRoomAddOns } from "./roomsData";

export const initialBookingData: BookingData = {
  selectedPackage: null,
  duration: "4",
  startDate: null,
  addOnCategories: initialAddOnCategories,
  selectedRoom: null,
  roomAddOns: initialRoomAddOns,
  totalPrice: 0,
  customerInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  }
};
