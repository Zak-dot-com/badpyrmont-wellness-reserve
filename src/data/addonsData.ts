
import { AddOnCategory } from "../types/bookingTypes";

export const initialAddOnCategories: AddOnCategory[] = [
  {
    id: "wellness-treatments",
    name: "Wellness Treatments",
    items: [
      {
        id: "massage-therapy",
        name: "Massage Therapy",
        description: "60-minute relaxing massage session",
        price: 80,
        selected: false,
        quantity: 2
      },
      {
        id: "facial-treatment",
        name: "Facial Treatment",
        description: "Rejuvenating facial with organic products",
        price: 95,
        selected: false,
        quantity: 2
      },
      {
        id: "hot-stone-therapy",
        name: "Hot Stone Therapy",
        description: "Therapeutic hot stone massage",
        price: 120,
        selected: false,
        quantity: 2
      },
      {
        id: "aromatherapy",
        name: "Aromatherapy Session",
        description: "Relaxing aromatherapy treatment",
        price: 75,
        selected: false,
        quantity: 2
      },
      {
        id: "body-scrub",
        name: "Full Body Scrub",
        description: "Exfoliating body scrub treatment",
        price: 85,
        selected: false,
        quantity: 2
      }
    ]
  },
  {
    id: "fitness-activities",
    name: "Fitness Activities",
    items: [
      {
        id: "personal-trainer",
        name: "Personal Trainer",
        description: "One-on-one fitness sessions",
        price: 110,
        selected: false,
        quantity: 2
      },
      {
        id: "yoga-classes",
        name: "Yoga Classes",
        description: "Daily yoga sessions",
        price: 60,
        selected: false,
        quantity: 2
      },
      {
        id: "aqua-fitness",
        name: "Aqua Fitness",
        description: "Water-based fitness activities",
        price: 55,
        selected: false,
        quantity: 2
      },
      {
        id: "meditation",
        name: "Guided Meditation",
        description: "Daily meditation sessions",
        price: 45,
        selected: false,
        quantity: 2
      },
      {
        id: "pilates",
        name: "Pilates Classes",
        description: "Core-strengthening pilates sessions",
        price: 65,
        selected: false,
        quantity: 2
      }
    ]
  },
  {
    id: "nutrition",
    name: "Nutrition & Diet",
    items: [
      {
        id: "diet-consultation",
        name: "Diet Consultation",
        description: "Personalized nutrition planning",
        price: 140,
        selected: false,
        quantity: 2
      },
      {
        id: "detox-program",
        name: "Detox Program",
        description: "Specialized detox meal plan",
        price: 190,
        selected: false,
        quantity: 2
      },
      {
        id: "cooking-class",
        name: "Healthy Cooking Class",
        description: "Learn to prepare healthy meals",
        price: 85,
        selected: false,
        quantity: 2
      },
      {
        id: "juice-cleanse",
        name: "Juice Cleanse",
        description: "Fresh, organic juice cleanse program",
        price: 110,
        selected: false,
        quantity: 2
      },
      {
        id: "nutrition-workshop",
        name: "Nutrition Workshop",
        description: "Group workshop on healthy eating",
        price: 70,
        selected: false,
        quantity: 2
      }
    ]
  }
];
