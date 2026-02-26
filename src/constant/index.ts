
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
};