"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormErrors } from "@/type";
import FieldError from "./FieldError";


interface PersonalInfoSectionProps {
  form: Record<string, string>;
  setForm: (form: Record<string, string>) => void;
  errors: FormErrors;
  clearError: (field: keyof FormErrors) => void;
}

export default function PersonalInfoSection({
  form,
  setForm,
  errors,
  clearError,
}: PersonalInfoSectionProps) {
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    clearError(field as keyof FormErrors);
  };

  return (
    <div className="space-y-4">
      {/* Name Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">First Name</Label>
          <Input
            value={form.firstName || ""}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={`bg-white text-sm ${
              errors.firstName
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-gray-200"
            }`}
            placeholder="First Name"
          />
          <FieldError message={errors.firstName} />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Last Name</Label>
          <Input
            value={form.lastName || ""}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={`bg-white text-sm ${
              errors.lastName
                ? "border-red-400 focus-visible:ring-red-400"
                : "border-gray-200"
            }`}
            placeholder="Last Name"
          />
          <FieldError message={errors.lastName} />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500">Email</Label>
        <Input
          type="email"
          value={form.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          className={`bg-white text-sm ${
            errors.email
              ? "border-red-400 focus-visible:ring-red-400"
              : "border-gray-200"
          }`}
          placeholder="client@email.com"
        />
        <FieldError message={errors.email} />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500">Phone</Label>
        <Input
          type="tel"
          value={form.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={`bg-white text-sm ${
            errors.phone
              ? "border-red-400 focus-visible:ring-red-400"
              : "border-gray-200"
          }`}
          placeholder="Phone number"
        />
        <FieldError message={errors.phone} />
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <Label className="text-xs text-gray-500">Property Address</Label>
        <Input
          value={form.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
          className={`bg-white text-sm ${
            errors.address
              ? "border-red-400 focus-visible:ring-red-400"
              : "border-gray-200"
          }`}
          placeholder="Property Address"
        />
        <FieldError message={errors.address} />
      </div>
    </div>
  );
}
