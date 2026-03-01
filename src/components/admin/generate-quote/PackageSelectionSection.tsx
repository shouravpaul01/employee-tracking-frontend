"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormErrors } from "@/type";
import { PACKAGES } from "@/constant";
import FieldError from "./FieldError";



interface PackageSelectionSectionProps {
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
  errors: FormErrors;
  clearError: (field: keyof FormErrors) => void;
}

export default function PackageSelectionSection({
  selectedPackage,
  setSelectedPackage,
  errors,
  clearError,
}: PackageSelectionSectionProps) {
  return (
    <div>
      <div
        className={`bg-white border rounded-xl p-4 space-y-2 ${
          errors.selectedPackage ? "border-red-400" : "border-gray-200"
        }`}
      >
        <Label className="text-sm font-semibold text-gray-700">Package</Label>
        <Select
          value={selectedPackage}
          onValueChange={(value) => {
            setSelectedPackage(value);
            clearError("selectedPackage");
          }}
          
        >
          <SelectTrigger
            className={`w-full ${
              errors.selectedPackage
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-gray-200"
            }`}
          >
            <SelectValue placeholder="Select Package" />
          </SelectTrigger>
          <SelectContent>
            {PACKAGES.map((pkg) => (
              <SelectItem key={pkg} value={pkg}>
                {pkg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <FieldError message={errors?.selectedPackage as string} />
    </div>
  );
}
