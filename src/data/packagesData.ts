
import { PackageType } from "../types/bookingTypes";

export const availablePackages: PackageType[] = [
  {
    id: "relaxation-retreat",
    name: "Relaxation Retreat",
    description: "A peaceful wellness package focused on relaxation and stress relief",
    basePrice: 200,
    type: "relaxation",
    image: "https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1470&auto=format&fit=crop",
    includesStandardRoom: true
  },
  {
    id: "detox-revitalize",
    name: "Detox & Revitalize",
    description: "Cleanse your body and mind with this comprehensive detox program",
    basePrice: 230,
    type: "wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop",
    includesStandardRoom: true
  },
  {
    id: "fitness-reboot",
    name: "Fitness Reboot",
    description: "Energize your body with intensive fitness activities and recovery treatments",
    basePrice: 245,
    type: "fitness",
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1470&auto=format&fit=crop",
    includesStandardRoom: true
  },
  {
    id: "luxury-escape",
    name: "Luxury Wellness Escape",
    description: "Our premium package with exclusive treatments and personalized service",
    basePrice: 300,
    type: "rejuvenation",
    image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=1470&auto=format&fit=crop",
    includesStandardRoom: true
  }
];
