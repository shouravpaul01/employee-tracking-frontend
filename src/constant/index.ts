
import { ProjectStatus } from "@/type";
import { Package, Car, Utensils, Bus, MoreHorizontal } from "lucide-react";

export const projectStatus = [
    "Walkthrough",
    "Staging",
    "Destaging",
    "Completed",
    "Pending",
  ];

  export const expensesStatus=[
    "Pending",
    "Approved",
    "Rejected"
  ]


export const expensesCategory = [
  {
    label: "Supplies",
    value: "SUPPLIES",
    icon: Package,
  },
  {
    label: "Mileage",
    value: "MILEAGE",
    icon: Car,
  },
  {
    label: "Food",
    value: "FOOD",
    icon: Utensils,
  },
  {
    label: "Transportation",
    value: "TRANSPORTATION",
    icon: Bus,
  },
  {
    label: "Others",
    value: "OTHERS",
    icon: MoreHorizontal,
  },
];

export const statusColors = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-400",
  STAGING: "bg-green-100 text-green-800 border-green-400",
  WALKTHROUGH: "bg-blue-100 text-blue-800 border-blue-400",
  DESTAGING: "bg-orange-100 text-orange-800 border-orange-400",
  COMPLETED: "bg-gray-100 text-gray-800 border-gray-400",
  APPROVED: "bg-green-100 text-green-800 border-green-400",
  REJECTED:"bg-red-100 text-red-600 border-red-300"
};

export const assignedEmployeeRoles=[
  "RUNNER",
  "PICKER"
]

export const ROOMS = [
  {
    id: "living_room",
    label: "Living Room",
    subItems: [
      "Sofa",
      "Coffee Table",
      "Accent Chairs",
      "Credenza",
      "Rug",
      "Accent Pillows/Throw",
      "Art",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "family_room",
    label: "Family Room",
    subItems: [
      "Sofa",
      "Coffee Table",
      "Accent Chairs",
      "Poufs",
      "Rug",
      "Accent Pillows/Throw",
      "Art",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "dining_room",
    label: "Dining Room",
    subItems: [
      "Dining Table",
      "Dining Chairs",
      "Art",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "breakfast_nook",
    label: "Breakfast Nook",
    subItems: ["Dining Chairs", "Art", "Plants", "Decor as Needed"],
  },
  {
    id: "primary_bedroom",
    label: "Primary Bedroom",
    subItems: [
      "Bedding",
      "Bench/Poufs",
      "Side Table",
      "Accent Pillows/Throw",
      "Table Lamps",
      "Art",
      "Rug",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "primary_conversation_nook",
    label: "Primary Bedroom Conversation Nook",
    subItems: [
      "Accent Chairs",
      "Accent Pillows",
      "Rug",
      "Art",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    subItems: [
      "Bar Stools",
      "Rug",
      "Window Treatments",
      "Art",
      "Decor as Needed",
    ],
  },
  {
    id: "guest_bedroom_1",
    label: "Guest Bedroom(1)",
    subItems: [
      "Bedding",
      "Bench/Poufs",
      "Nightstands",
      "Accent Pillows/Throw",
      "Table Lamps",
      "Art",
      "Rug",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "guest_bedroom_2",
    label: "Guest Bedroom(2)",
    subItems: [
      "Bedding",
      "Bench/Poufs",
      "Nightstands",
      "Accent Pillows/Throw",
      "Table Lamps",
      "Art",
      "Rug",
      "Plants",
      "Decor as Needed",
    ],
  },
  {
    id: "office",
    label: "Office",
    subItems: ["Rug", "Floor Lamp", "Plants", "Art", "Decor as Needed"],
  },
  {
    id: "all_bathrooms",
    label: "All Bathroom Included",
    subItems: [
      "Vanity Mirror",
      "Towel Hooks/Bars",
      "Bath Mat",
      "Art",
      "Decor as Needed",
    ],
  },
];

export const PACKAGES = ["Standard", "Premium"];
