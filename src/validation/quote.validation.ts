import z from "zod";

export const quoteFormSchema = z.object({
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