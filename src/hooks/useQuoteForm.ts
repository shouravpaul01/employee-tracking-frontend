import { useState } from "react";
import { FormErrors } from "@/type";

interface QuoteFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export function useQuoteForm() {
  const [form, setForm] = useState<QuoteFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [subSelections, setSubSelections] = useState<Record<string, string[]>>({});
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [estimatedTotal, setEstimatedTotal] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  const estimatedTotalNum = parseFloat(estimatedTotal) || 0;
  const discountNum = Math.min(parseFloat(discountPercent) || 0, 100);
  const totalAmount = estimatedTotalNum * (1 - discountNum / 100);

  return {
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
    errors,
    setErrors,
    totalAmount,
    estimatedTotalNum,
    discountNum,
  };
}
