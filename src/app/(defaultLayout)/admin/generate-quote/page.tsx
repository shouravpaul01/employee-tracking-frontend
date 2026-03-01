"use client";

import { useState } from "react";
import { FileText, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Header from "@/components/shared/Header";
import { QuoteData, FormErrors } from "@/type";
import { useQuoteForm } from "@/hooks/useQuoteForm";
import { useQuoteValidation } from "@/hooks/useQuoteValidation";
import QuotePreview from "@/components/admin/generate-quote/QuotePreview";
import QuoteForm from "@/components/admin/generate-quote/QuoteForm";
import { ROOMS } from "@/constant";


export default function GenerateQuotePage() {
  const [view, setView] = useState<"form" | "preview">("form");
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const {
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
  } = useQuoteForm();

  const { validateQuote } = useQuoteValidation();

  const handleGenerateQuote = () => {
    const validationResult = validateQuote({
      form,
      selectedRooms,
      selectedPackage,
      estimatedTotal,
      discountPercent,
      subSelections,
    });

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      // toast.error("Please fix the errors before continuing.");
      return;
    }

    setErrors({});

    // Create filtered rooms data
    const filteredRooms = selectedRooms
      .map((id) => {
        const room = ROOMS.find((r) => r.id === id)!;
        return { name: room.label, items: subSelections[id] || [] };
      })
      .filter((r) => {
        const roomDef = ROOMS.find((rd) => rd.label === r.name)!;
        return roomDef.subItems.length === 0 || r.items.length > 0;
      });

    const estimatedTotalNum = parseFloat(estimatedTotal) || 0;
    const discountNum = Math.min(parseFloat(discountPercent) || 0, 100);

    setQuoteData({
      quoteNumber: String(Math.floor(Math.random() * 9000) + 1000),
      quoteDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      clientId: `client_${form.firstName.toLowerCase()}_${Date.now()}`,
      clientName: `${form.firstName} ${form.lastName}`.trim(),
      clientAddress: form.address,
      clientEmail: form.email,
      clientPhone: form.phone,
      packageName: selectedPackage,
      rooms: filteredRooms,
      estimatedTotal: estimatedTotalNum,
      discountPercent: discountNum,
      totalAmount: estimatedTotalNum * (1 - discountNum / 100),
    });
    setView("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditQuote = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex w-full">
        <Header
          backHref="/profile"
          title="Generate Quote"
          rightContent={
            view === "preview" && (
              <Button
                variant="ghost"
                size="lg"
                className="rounded-full hover:text-primary cursor-pointer text-black"
                onClick={handleEditQuote}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Quote
              </Button>
            )
          }
        />
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-5 space-y-4 pb-8">
        {view === "preview" && quoteData ? (
          <QuotePreview quote={quoteData} onEdit={handleEditQuote} />
        ) : (
          <QuoteForm
            form={form}
            setForm={setForm}
            selectedRooms={selectedRooms}
            setSelectedRooms={setSelectedRooms}
            subSelections={subSelections}
            setSubSelections={setSubSelections}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            estimatedTotal={estimatedTotal}
            setEstimatedTotal={setEstimatedTotal}
            discountPercent={discountPercent}
            setDiscountPercent={setDiscountPercent}
            totalAmount={totalAmount}
            errors={errors}
            clearError={clearError}
            onGenerate={handleGenerateQuote}
          />
        )}
      </div>
    </div>
  );
}

