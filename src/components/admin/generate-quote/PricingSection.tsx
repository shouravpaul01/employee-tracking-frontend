"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors } from "@/type";


interface PricingSectionProps {
  estimatedTotal: string;
  setEstimatedTotal: (total: string) => void;
  discountPercent: string;
  setDiscountPercent: (percent: string) => void;
  totalAmount: number;
  errors: FormErrors;
  clearError: (field: keyof FormErrors) => void;
}

export default function PricingSection({
  estimatedTotal,
  setEstimatedTotal,
  discountPercent,
  setDiscountPercent,
  totalAmount,
  errors,
  clearError,
}: PricingSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
      {/* Estimated Total */}
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm text-gray-600 shrink-0">
          Estimated Total
        </Label>
        <div className="relative w-36">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            $
          </span>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={estimatedTotal}
            onChange={(e) => {
              setEstimatedTotal(e.target.value);
              clearError("estimatedTotal");
            }}
            className={`pl-6 text-right ${
              errors.estimatedTotal
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-gray-200"
            }`}
            placeholder="0.00"
          />
        </div>
      </div>
      {errors.estimatedTotal && (
        <p className="text-xs text-red-500 text-right">
          {errors.estimatedTotal}
        </p>
      )}

      {/* Discount */}
      <div className="flex items-center justify-between gap-4">
        <Label className="text-sm text-gray-600 shrink-0">Discount</Label>
        <div className="relative w-36">
          <Input
            type="number"
            min="0"
            max="100"
            step="0.1"
            value={discountPercent}
            onChange={(e) => {
              setDiscountPercent(e.target.value);
              clearError("discountPercent");
            }}
            className={`pr-6  text-right  ${
              errors.discountPercent
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-gray-200"
            }`}
            placeholder="0"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            %
          </span>
        </div>
      </div>
      {errors.discountPercent && (
        <p className="text-xs text-red-500 text-right">
          {errors.discountPercent}
        </p>
      )}

      {/* Total Amount */}
      <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900">
          Total Amount:
        </span>
        <span className="text-lg font-bold text-gray-900">
          $
          {totalAmount.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      </div>
    </div>
  );
}
