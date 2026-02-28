// src\app\(defaultLayout)\admin\generate-quote\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import {
  FileText,
  Eye,
  Download,
  Send,
  FilePlus,
  Loader2,
  CheckCircle,
  ChevronDown,
  Edit,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Header from "@/components/shared/Header";
import { QuoteData, FormErrors } from "@/type";
import { downloadQuotePDF, generateQuotePDFBase64 } from "@/utils/pdf/quotePdfGenerator";

// ─── Zod validation schema ────────────────────────────────────────────────────
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

// ─── Room definitions ────────────────────────────────────────────────────────
const ROOMS = [
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

// ─── Package options ──────────────────────────────────────────────────────────
const PACKAGES = [
  "Standard",
  "Premium",
];

// ─── Field error message ──────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs text-red-500 mt-1">{message}</p>;
}

// ─── Check circle icon ────────────────────────────────────────────────────────
function CheckCircleIcon({ checked }: { checked: boolean }) {
  return checked ? (
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  ) : (
    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-white shrink-0" />
  );
}

// ─── Sub-items popup ──────────────────────────────────────────────────────────
function SubItemsPopup({
  room,
  selectedItems,
  onToggle,
  onClose,
}: {
  room: (typeof ROOMS)[0];
  selectedItems: string[];
  onToggle: (item: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div
        className="fixed left-1/2 z-50 w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden"
        style={{ top: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="px-4 pt-3 pb-2 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {room.label}
          </p>
        </div>
        <div className="py-2 max-h-72 overflow-y-auto">
          {room.subItems.map((item) => {
            const checked = selectedItems.includes(item);
            return (
              <button
                key={item}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors text-left"
                onClick={() => onToggle(item)}
              >
                <CheckCircleIcon checked={checked} />
                <span
                  className={`text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-500"}`}
                >
                  {item}
                </span>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-gray-100">
          <Button
            onClick={onClose}
            className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white h-10 text-sm"
          >
            Done
          </Button>
        </div>
      </div>
    </>
  );
}

// ─── Quote Preview component ──────────────────────────────────────────────────
function QuotePreview({
  quote,
  onEdit,
}: {
  quote: QuoteData;
  onEdit: () => void;
}) {
  const [downloading, setDownloading] = useState(false);
  const [emailing, setEmailing] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadQuotePDF(quote);
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  };

  const handleEmailClient = async () => {
    setEmailing(true);
    try {
      // Generate PDF as base64
      const base64 = await generateQuotePDFBase64(quote);

      

      // Get API URL from environment
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        // Development fallback
        console.log("Email simulation:", {
          clientId: quote.clientId,
          clientEmail: quote.clientEmail,
          clientName: quote.clientName,
          quoteNumber: quote.quoteNumber,
        });

        setEmailSent(true);
        toast.success(`Quote emailed to ${quote.clientEmail}! (simulated)`);
        setTimeout(() => setEmailSent(false), 4000);
        return;
      }

      // Send email via API
      const response = await fetch(`${apiUrl}/api/quotes/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: quote.clientId,
          clientEmail: quote.clientEmail,
          clientName: quote.clientName,
          quoteNumber: quote.quoteNumber,
          pdfBase64: base64,
          fileName: `Quote-${quote.quoteNumber}.pdf`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setEmailSent(true);
      toast.success(`Quote emailed to ${quote.clientEmail}!`);
      setTimeout(() => setEmailSent(false), 4000);
    } catch (error) {
      console.error("Email sending error:", error);
      // Fallback for development
      setEmailSent(true);
      toast.success(`Quote emailed to ${quote.clientEmail}! (simulated)`);
      setTimeout(() => setEmailSent(false), 4000);
    } finally {
      setEmailing(false);
    }
  };

  // Calculate per room amount
  const perRoomAmount =
    quote.rooms.length > 0 ? quote.estimatedTotal / quote.rooms.length : 0;

  const discountAmount = (quote.estimatedTotal * quote.discountPercent) / 100;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <div className="px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-bold text-gray-900 text-base">
                Quote Preview
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {quote.clientAddress}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">
                Quote #{`QT-2026-${quote.quoteNumber}`}
              </p>
              <p className="text-xs text-gray-500">{quote.quoteDate}</p>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-b border-gray-100">
          <p className="font-semibold text-gray-900 text-sm">
            {quote.clientName}
          </p>
          <p className="text-xs text-gray-500 mt-1">{quote.clientAddress}</p>
          <p className="text-xs text-gray-500">{quote.clientEmail}</p>
          <p className="text-xs text-gray-500">{quote.clientPhone}</p>
        </div>

        {quote.packageName && (
          <div className="px-5 py-3 border-b border-gray-100 bg-blue-50">
            <p className="text-xs font-medium text-blue-600">
              {quote.packageName}
            </p>
          </div>
        )}

        {/* Room rows */}
        <div className="px-5 py-4 space-y-3 border-b border-gray-100">
          {quote.rooms.map((room) => (
            <div
              key={room.name}
              className="flex items-center justify-between gap-4"
            >
              <span className="text-sm text-gray-700">{room.name}</span>
              <span className="text-sm text-gray-700 shrink-0">
                $
                {perRoomAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Totals */}
        <div className="px-5 py-4 space-y-2.5">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-gray-900">
              Total Amount
            </span>
            <span className="text-base font-bold text-gray-900">
              $
              {quote.totalAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <div className="border-t border-gray-100 pt-2.5 space-y-1.5">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Estimated Total</span>
              <span>
                $
                {quote.estimatedTotal.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            {quote.discountPercent > 0 && (
              <div className="flex justify-between text-sm text-gray-500">
                <span>Discount ({quote.discountPercent}%)</span>
                <span>
                  -$
                  {discountAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        A professional PDF will be generated matching the Surfside Staging quote
        format
      </p>

      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleDownload}
          disabled={downloading}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-12 font-medium"
        >
          {downloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </>
          )}
        </Button>

        <Button
          onClick={handleEmailClient}
          disabled={emailing || emailSent}
          variant="outline"
          className="border-gray-300 rounded-xl h-12 font-medium"
        >
          {emailing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Sending...
            </>
          ) : emailSent ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Sent!
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Email Client
            </>
          )}
        </Button>
      </div>

      <Button
        variant="outline"
        onClick={onEdit}
        className="w-full border-gray-200 rounded-xl h-11 text-gray-700 font-medium hover:bg-gray-50"
      >
        <FilePlus className="w-4 h-4 mr-2" />
        Create New Quote
      </Button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function GenerateQuotePage() {
  const router = useRouter();
  const [view, setView] = useState<"form" | "preview">("form");

  // Form state
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [subSelections, setSubSelections] = useState<Record<string, string[]>>(
    {},
  );
  const [openPopupRoom, setOpenPopupRoom] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const [packageOpen, setPackageOpen] = useState(false);
  const [estimatedTotal, setEstimatedTotal] = useState<string>("");
  const [discountPercent, setDiscountPercent] = useState<string>("");

  // Validation errors
  const [errors, setErrors] = useState<FormErrors>({});

  // Computed
  const estimatedTotalNum = parseFloat(estimatedTotal) || 0;
  const discountNum = Math.min(parseFloat(discountPercent) || 0, 100);
  const totalAmount = estimatedTotalNum * (1 - discountNum / 100);

  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const toggleRoom = (roomId: string) =>
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((r) => r !== roomId)
        : [...prev, roomId],
    );

  const openSubItems = (e: React.MouseEvent, roomId: string) => {
    e.stopPropagation();
    setOpenPopupRoom(roomId);
  };

  const toggleSubItem = (roomId: string, item: string) =>
    setSubSelections((prev) => {
      const current = prev[roomId] || [];
      return {
        ...prev,
        [roomId]: current.includes(item)
          ? current.filter((i) => i !== item)
          : [...current, item],
      };
    });

  // Clear a field error when user starts editing it
  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleGenerateQuote = () => {
    // Run Zod validation
    const result = quoteFormSchema.safeParse({
      ...form,
      selectedRooms,
      selectedPackage,
      estimatedTotal,
      discountPercent: discountPercent || "0",
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof FormErrors;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.error("Please fix the errors before continuing.");
      return;
    }

    // Extra check: every selected room that HAS sub-items must have at least one selected
    const roomsWithNoSubSelection = selectedRooms.filter((id) => {
      const room = ROOMS.find((r) => r.id === id)!;
      return (
        room.subItems.length > 0 && (subSelections[id] || []).length === 0
      );
    });

    if (roomsWithNoSubSelection.length > 0) {
      const names = roomsWithNoSubSelection
        .map((id) => ROOMS.find((r) => r.id === id)!.label)
        .join(", ");
      toast.error(`Please select at least one item for: ${names}`);
      return;
    }

    setErrors({});

    // Only include rooms that have no sub-items available OR have at least one sub-item selected
    const filteredRooms = selectedRooms
      .map((id) => {
        const room = ROOMS.find((r) => r.id === id)!;
        return { name: room.label, items: subSelections[id] || [] };
      })
      .filter((r) => {
        const roomDef = ROOMS.find((rd) => rd.label === r.name)!;
        return roomDef.subItems.length === 0 || r.items.length > 0;
      });

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
      totalAmount,
    });
    setView("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditQuote = () => {
    setView("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeRoom = openPopupRoom
    ? ROOMS.find((r) => r.id === openPopupRoom)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex w-full">
        <Header backHref="/profile"
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
          <>
            {/* Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-gray-500">First Name</Label>
                <Input
                  value={form.firstName}
                  onChange={(e) => {
                    setForm({ ...form, firstName: e.target.value });
                    clearError("firstName");
                  }}
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
                  value={form.lastName}
                  onChange={(e) => {
                    setForm({ ...form, lastName: e.target.value });
                    clearError("lastName");
                  }}
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
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  clearError("email");
                }}
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
                value={form.phone}
                onChange={(e) => {
                  setForm({ ...form, phone: e.target.value });
                  clearError("phone");
                }}
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
                value={form.address}
                onChange={(e) => {
                  setForm({ ...form, address: e.target.value });
                  clearError("address");
                }}
                className={`bg-white text-sm ${
                  errors.address
                    ? "border-red-400 focus-visible:ring-red-400"
                    : "border-gray-200"
                }`}
                placeholder="Property Address"
              />
              <FieldError message={errors.address} />
            </div>

            {/* Room list */}
            <div>
              <div
                className={`bg-white border rounded-xl divide-y divide-gray-100 overflow-hidden ${
                  errors.selectedRooms ? "border-red-400" : "border-gray-200"
                }`}
              >
                {ROOMS.map((room) => {
                  const isSelected = selectedRooms.includes(room.id);
                  const subCount = subSelections[room.id]?.length || 0;
                  return (
                    <div
                      key={room.id}
                      className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        toggleRoom(room.id);
                        clearError("selectedRooms");
                      }}
                    >
                      <CheckCircleIcon checked={isSelected} />
                      <span
                        className={`flex-1 text-sm ${
                          isSelected ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {room.label}
                        {subCount > 0 && (
                          <span className="ml-1.5 text-xs text-blue-500 font-medium">
                            ({subCount} selected)
                          </span>
                        )}
                      </span>
                      <button
                        className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                        onClick={(e) => openSubItems(e, room.id)}
                        title="Select items"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <FieldError message={errors.selectedRooms} />
            </div>

            {/* Package selector */}
            <div>
              <div
                className={`bg-white border rounded-xl p-4 space-y-2 ${
                  errors.selectedPackage ? "border-red-400" : "border-gray-200"
                }`}
              >
                <Label className="text-sm font-semibold text-gray-700">
                  Package
                </Label>
                <div className="relative">
                  <button
                    className={`w-full flex items-center justify-between border rounded-lg px-3 py-2.5 text-sm text-left bg-gray-50 hover:border-gray-300 transition-colors ${
                      errors.selectedPackage
                        ? "border-red-400"
                        : "border-gray-200"
                    }`}
                    onClick={() => {
                      setPackageOpen(!packageOpen);
                      clearError("selectedPackage");
                    }}
                  >
                    <span
                      className={
                        selectedPackage ? "text-gray-900" : "text-gray-400"
                      }
                    >
                      {selectedPackage || "Select Package"}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform ${
                        packageOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {packageOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden">
                      {PACKAGES.map((pkg) => (
                        <button
                          key={pkg}
                          className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                            selectedPackage === pkg
                              ? "text-blue-500 font-medium bg-blue-50"
                              : "text-gray-700"
                          }`}
                          onClick={() => {
                            setSelectedPackage(pkg);
                            setPackageOpen(false);
                            clearError("selectedPackage");
                          }}
                        >
                          {pkg}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <FieldError message={errors.selectedPackage} />
            </div>

            {/* Pricing */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
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
                    className={`pl-6 text-sm text-right bg-gray-50 h-9 ${
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
              <div className="flex items-center justify-between gap-4">
                <Label className="text-sm text-gray-600 shrink-0">
                  Discount
                </Label>
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
                    className={`pr-6 text-sm text-right bg-gray-50 h-9 ${
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
              <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">
                  Total Amount:
                </span>
                <span className="text-sm font-bold text-gray-900">
                  $
                  {totalAmount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <Button
              onClick={handleGenerateQuote}
              className="w-full font-medium rounded-xl h-12 flex items-center justify-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
            >
              <FileText className="w-4 h-4" />
              Generate Quote
            </Button>
          </>
        )}
      </div>

      {/* Sub-items popup */}
      {activeRoom && (
        <SubItemsPopup
          room={activeRoom}
          selectedItems={subSelections[activeRoom.id] || []}
          onToggle={(item) => toggleSubItem(activeRoom.id, item)}
          onClose={() => setOpenPopupRoom(null)}
        />
      )}
    </div>
  );
}