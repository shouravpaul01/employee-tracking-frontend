// src\components\generate-quote\SubItemsPopup.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, FileText, Eye, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Room definitions with sub-items ────────────────────────────────────────
const ROOMS: { id: string; label: string; subItems: string[] }[] = [
  {
    id: "living_room",
    label: "Living Room",
    subItems: [
      "Sofa", "Coffee Table", "Accent Chairs", "Credenza", "Rug",
      "Accent Pillows/Throw", "Art", "Plants", "Decor as Needed",
    ],
  },
  {
    id: "family_room",
    label: "Family Room",
    subItems: [
      "Sofa", "Coffee Table", "Accent Chairs", "Poufs", "Rug",
      "Accent Pillows/Throw", "Art", "Plants", "Decor as Needed",
    ],
  },
  {
    id: "dining_room",
    label: "Dining Room",
    subItems: ["Dining Table", "Dining Chairs", "Art", "Plants", "Decor as Needed"],
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
      "Bedding", "Bench/Poufs", "Side Table", "Accent Pillows/Throw",
      "Table Lamps", "Art", "Rug", "Plants", "Decor as Needed",
    ],
  },
  {
    id: "primary_conversation_nook",
    label: "Primary Bedroom Conversation Nook",
    subItems: ["Accent Chairs", "Accent Pillows", "Rug", "Art", "Plants", "Decor as Needed"],
  },
  {
    id: "kitchen",
    label: "Kitchen",
    subItems: ["Bar Stools", "Rug", "Window Treatments", "Art", "Decor as Needed"],
  },
  {
    id: "guest_bedroom_1",
    label: "Guest Bedroom(1)",
    subItems: [
      "Bedding", "Bench/Poufs", "Nightstands", "Accent Pillows/Throw",
      "Table Lamps", "Art", "Rug", "Plants", "Decor as Needed",
    ],
  },
  {
    id: "guest_bedroom_2",
    label: "Guest Bedroom(2)",
    subItems: [
      "Bedding", "Bench/Poufs", "Nightstands", "Accent Pillows/Throw",
      "Table Lamps", "Art", "Rug", "Plants", "Decor as Needed",
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
    subItems: ["Vanity Mirror", "Towel Hooks/Bars", "Bath Mat", "Art", "Decor as Needed"],
  },
];

const PACKAGES = [
  "Basic",
  "Premium",
];

function CheckCircleIcon({ checked }: { checked: boolean }) {
  return checked ? (
    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 shrink-0">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  ) : (
    <span className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-white shrink-0" />
  );
}

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
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{room.label}</p>
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
                <span className={`text-sm ${checked ? "text-gray-900 font-medium" : "text-gray-500"}`}>
                  {item}
                </span>
              </button>
            );
          })}
        </div>
        <div className="p-3 border-t border-gray-100">
          <Button onClick={onClose} className="w-full rounded-xl bg-blue-500 hover:bg-blue-600 text-white h-10 text-sm">
            Done
          </Button>
        </div>
      </div>
    </>
  );
}

export default function GenerateQuotePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "Cameron",
    lastName: "Williamson",
    email: "client@email.com",
    phone: "00000 000000 00000",
    address: "1901 Thornridge Cir",
  });

  const [selectedRooms, setSelectedRooms] = useState<string[]>([
    "living_room", "family_room", "primary_conversation_nook", "office", "all_bathrooms",
  ]);

  const [subSelections, setSubSelections] = useState<Record<string, string[]>>({});
  const [openPopupRoom, setOpenPopupRoom] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState("Standard Occupied Home Staging Package");
  const [packageOpen, setPackageOpen] = useState(false);

  const estimatedTotal = 5240.0;
  const discountPercent = 10;
  const totalAmount = estimatedTotal * (1 - discountPercent / 100);

  const toggleRoom = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId) ? prev.filter((r) => r !== roomId) : [...prev, roomId]
    );
  };

  const openSubItems = (e: React.MouseEvent, roomId: string) => {
    e.stopPropagation();
    setOpenPopupRoom(roomId);
  };

  const toggleSubItem = (roomId: string, item: string) => {
    setSubSelections((prev) => {
      const current = prev[roomId] || [];
      return {
        ...prev,
        [roomId]: current.includes(item) ? current.filter((i) => i !== item) : [...current, item],
      };
    });
  };

  const handleGenerateQuote = () => {
    // Navigate to the quote preview page
    // In a real app, pass quote data via router state, Zustand, or API
    router.push("/admin/generate-quote/quote-preview");
  };

  const activeRoom = openPopupRoom ? ROOMS.find((r) => r.id === openPopupRoom) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <h1 className="font-semibold text-gray-900">Generate Quote</h1>
      </div>

      <div className="container max-w-2xl mx-auto px-4 py-5 space-y-4 pb-24">
        <h2 className="font-semibold text-gray-900 text-lg">Generate Quote</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500">First Name</Label>
            <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} className="bg-white border-gray-200 text-sm" placeholder="First Name" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-gray-500">Last Name</Label>
            <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} className="bg-white border-gray-200 text-sm" placeholder="Last Name" />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Email</Label>
          <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-white border-gray-200 text-sm" placeholder="client@email.com" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Phone</Label>
          <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-white border-gray-200 text-sm" placeholder="Phone number" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Property Address</Label>
          <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="bg-white border-gray-200 text-sm" placeholder="Property Address" />
        </div>

        {/* Room list */}
        <div className="bg-white border border-gray-200 rounded-xl divide-y divide-gray-100 overflow-hidden">
          {ROOMS.map((room) => {
            const isSelected = selectedRooms.includes(room.id);
            const subCount = subSelections[room.id]?.length || 0;
            return (
              <div
                key={room.id}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleRoom(room.id)}
              >
                <CheckCircleIcon checked={isSelected} />
                <span className={`flex-1 text-sm ${isSelected ? "text-gray-900" : "text-gray-400"}`}>
                  {room.label}
                  {subCount > 0 && (
                    <span className="ml-1.5 text-xs text-blue-500 font-medium">({subCount} selected)</span>
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

        {/* Package */}
        <div className="space-y-1.5">
          <Label className="text-xs text-gray-500">Package</Label>
          <div className="relative">
            <button
              className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-left hover:border-gray-300 transition-colors"
              onClick={() => setPackageOpen(!packageOpen)}
            >
              <span className={selectedPackage ? "text-gray-900" : "text-gray-400"}>
                {selectedPackage || "Select Package"}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${packageOpen ? "rotate-180" : ""}`} />
            </button>
            {packageOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-30 overflow-hidden">
                {PACKAGES.map((pkg) => (
                  <button
                    key={pkg}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${selectedPackage === pkg ? "text-blue-500 font-medium bg-blue-50" : "text-gray-700"}`}
                    onClick={() => { setSelectedPackage(pkg); setPackageOpen(false); }}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Pricing summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Estimated Total</span>
            <span className="text-sm font-semibold text-gray-900">
              ${estimatedTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Discount</span>
            <span className="text-sm text-gray-700">{discountPercent}%</span>
          </div>
          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-900">Total Amount:</span>
            <span className="text-sm font-bold text-gray-900">
              ${totalAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Sticky button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3">
        <Button
          onClick={handleGenerateQuote}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl h-12 flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          Generate Quote
        </Button>
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