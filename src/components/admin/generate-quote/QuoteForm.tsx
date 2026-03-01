"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormErrors } from "@/type";
import PersonalInfoSection from "./PersonalInfoSection";
import RoomSelectionSection from "./RoomSelectionSection";
import PackageSelectionSection from "./PackageSelectionSection";
import PricingSection from "./PricingSection";
import { FieldValues } from "react-hook-form";


interface QuoteFormProps {
  form: FieldValues;
  setForm: (form: any) => void;
  selectedRooms: string[];
  setSelectedRooms: (rooms: string[]) => void;
  subSelections: Record<string, string[]>;
  setSubSelections: (selections: Record<string, string[]>) => void;
  selectedPackage: string;
  setSelectedPackage: (pkg: string) => void;
  estimatedTotal: string;
  setEstimatedTotal: (total: string) => void;
  discountPercent: string;
  setDiscountPercent: (percent: string) => void;
  totalAmount: number;
  errors: FormErrors;
  clearError: (field: keyof FormErrors) => void;
  onGenerate: () => void;
}

export default function QuoteForm({
  form,
  setForm,
  selectedRooms,
  setSelectedRooms,
  subSelections,
  setSubSelections,
  selectedPackage,
  setSelectedPackage,
  estimatedTotal,
  setEstimatedTotal,
  discountPercent,
  setDiscountPercent,
  totalAmount,
  errors,
  clearError,
  onGenerate,
}: QuoteFormProps) {
  return (
    <div className="space-y-4">
      {/* Personal Information */}
      <PersonalInfoSection
        form={form}
        setForm={setForm}
        errors={errors}
        clearError={clearError}
      />

      {/* Room Selection */}
      <RoomSelectionSection
        selectedRooms={selectedRooms}
        setSelectedRooms={setSelectedRooms}
        subSelections={subSelections}
        setSubSelections={setSubSelections}
        errors={errors}
        clearError={clearError}
      />

      {/* Package Selection */}
      <PackageSelectionSection
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
        errors={errors}
        clearError={clearError}
      />

      {/* Pricing */}
      <PricingSection
        estimatedTotal={estimatedTotal}
        setEstimatedTotal={setEstimatedTotal}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
        totalAmount={totalAmount}
        errors={errors}
        clearError={clearError}
      />

      {/* Generate Button */}
      <Button
        onClick={onGenerate}
        className="w-full "
      >
        <FileText className="w-4 h-4" />
        Generate Quote
      </Button>
    </div>
  );
}
