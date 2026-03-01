import { z } from "zod";
import { FormErrors } from "@/type";
import { ROOMS } from "@/constant";
import { FieldValues } from "react-hook-form";


const quoteFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[+\d\s\-().]{7,20}$/, "Enter a valid phone number"),
  address: z.string().min(1, "Property address is required"),
  selectedRooms: z.array(z.string()).min(1, "Select at least one room"),
  selectedPackage: z.string().min(1, "Please select a package"),
  estimatedTotal: z
    .string()
    .min(1, "Estimated total is required")
    .refine((v) => !isNaN(parseFloat(v)) && parseFloat(v) > 0, {
      message: "Enter a valid amount greater than 0",
    }),
  discountPercent: z
    .string()
    .refine(
      (v) =>
        v === "" ||
        (!isNaN(parseFloat(v)) && parseFloat(v) >= 0 && parseFloat(v) <= 100),
      {
        message: "Discount must be between 0 and 100",
      },
    ),
});

interface ValidationInput {
  form: FieldValues;
  selectedRooms: string[];
  selectedPackage: string;
  estimatedTotal: string;
  discountPercent: string;
  subSelections: Record<string, string[]>;
}

export function useQuoteValidation() {
  const validateQuote = (input: ValidationInput) => {
    const result = quoteFormSchema.safeParse({
      ...input.form,
      selectedRooms: input.selectedRooms,
      selectedPackage: input.selectedPackage,
      estimatedTotal: input.estimatedTotal,
      discountPercent: input.discountPercent || "0",
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });

      return { isValid: false, errors: fieldErrors };
    }

    // Validate room sub-selections
    const roomsWithNoSubSelection = input.selectedRooms.filter((id) => {
      const room = ROOMS.find((r) => r.id === id)!;
      return (
        room.subItems.length > 0 &&
        (input.subSelections[id] || []).length === 0
      );
    });

    if (roomsWithNoSubSelection.length > 0) {
      const names = roomsWithNoSubSelection
        .map((id) => ROOMS.find((r) => r.id === id)!.label)
        .join(", ");
      return {
        isValid: false,
        errors: {
          selectedRooms: `Please select at least one item for: ${names}`,
        } as FormErrors,
      };
    }

    return { isValid: true, errors: {} };
  };

  return { validateQuote };
}
