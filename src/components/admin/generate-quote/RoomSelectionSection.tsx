"use client";

import { useState, useEffect, useRef } from "react";
import { Eye, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { FormErrors } from "@/type";
import { ROOMS } from "@/constant";
import FieldError from "./FieldError";
import SubItemsDialog from "./SubItemsDialog";

interface RoomSelectionSectionProps {
  selectedRooms: string[];
  setSelectedRooms: (rooms: string[]) => void;
  subSelections: Record<string, string[]>;
  setSubSelections: (selections: Record<string, string[]>) => void;
  errors: FormErrors;
  clearError: (field: keyof FormErrors) => void;
}

export default function RoomSelectionSection({
  selectedRooms,
  setSelectedRooms,
  subSelections,
  setSubSelections,
  errors,
  clearError,
}: RoomSelectionSectionProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [expandedRooms, setExpandedRooms] = useState<Set<string>>(new Set());
  const initializedRef = useRef(false);

  // Initialize with all rooms and items selected (only once on mount)
  useEffect(() => {
    if (!initializedRef.current && selectedRooms.length === 0) {
      initializedRef.current = true;

      // Select all rooms
      const allRoomIds = ROOMS.map((r) => r.id);
      setSelectedRooms(allRoomIds);

      // Select all items for each room
      const allSubSelections: Record<string, string[]> = {};
      ROOMS.forEach((room) => {
        allSubSelections[room.id] = room.subItems;
      });
      setSubSelections(allSubSelections);

      clearError("selectedRooms");
    }
  }, []);

  const toggleRoom = (roomId: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    setSelectedRooms(
      selectedRooms.includes(roomId)
        ? selectedRooms.filter((r) => r !== roomId)
        : [...selectedRooms, roomId],
    );
    clearError("selectedRooms");
  };

  const toggleRoomExpanded = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newExpanded = new Set(expandedRooms);
    if (newExpanded.has(roomId)) {
      newExpanded.delete(roomId);
    } else {
      newExpanded.add(roomId);
    }
    setExpandedRooms(newExpanded);
  };

  const openSubItemsDialog = (roomId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRoomId(roomId);
  };

  const toggleSubItem = (roomId: string, item: string) => {
    setSubSelections({
      ...subSelections,
      [roomId]: (subSelections[roomId] || []).includes(item)
        ? (subSelections[roomId] || []).filter((i) => i !== item)
        : [...(subSelections[roomId] || []), item],
    });
  };

  const activeRoom = selectedRoomId
    ? ROOMS.find((r) => r.id === selectedRoomId)
    : null;

  return (
    <div className="space-y-3">
      <div
        className={`bg-white border rounded-xl divide-y divide-gray-100 overflow-hidden ${
          errors.selectedRooms ? "border-red-400" : "border-gray-200"
        }`}
      >
        {ROOMS.map((room) => {
          const isSelected = selectedRooms.includes(room.id);
          const selectedItems = subSelections[room.id] || [];
          const subCount = selectedItems.length;
          const isExpanded = expandedRooms.has(room.id);
          const hasSubItems = room.subItems.length > 0;
          const allItemsSelected =
            selectedItems.length === room.subItems.length;

          return (
            <div key={room.id}>
              {/* Room Row */}
              <div
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => toggleRoom(room.id)}
              >
                {/* Checkbox - shadcn */}
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggleRoom(room.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                />

                {/* Room Label */}
                <div className="flex-1">
                  <span
                    className={`text-sm ${
                      isSelected ? "text-gray-900 font-medium" : "text-gray-700"
                    }`}
                  >
                    {room.label}
                  </span>
                  {isSelected && hasSubItems && (
                    <p className="text-xs text-blue-600 mt-0.5">
                      {subCount}/{room.subItems.length} items selected
                    </p>
                  )}
                </div>

                {/* Status Badge - Only for selected rooms */}
                {isSelected && hasSubItems && (
                  <div
                    className={`inline-flex items-center justify-center px-2 py-1 rounded text-xs font-semibold ${
                      allItemsSelected
                        ? "bg-green-100 text-green-700"
                        : subCount > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {allItemsSelected
                      ? "All"
                      : subCount > 0
                        ? "Partial"
                        : "None"}
                  </div>
                )}

                {/* Action Buttons - Only for selected rooms */}
                {isSelected && hasSubItems && (
                  <div className="flex items-center gap-1">
                    {/* Edit items button */}
                    <button
                      className="p-1.5 rounded hover:bg-blue-200 transition-colors"
                      onClick={(e) => openSubItemsDialog(room.id, e)}
                      title="Edit items"
                    >
                      <Eye className="w-4 h-4 text-blue-600" />
                    </button>

                    {/* Expand/Collapse button */}
                    <button
                      className="p-1.5 rounded hover:bg-blue-200 transition-colors"
                      onClick={(e) => toggleRoomExpanded(room.id, e)}
                      title={isExpanded ? "Hide items" : "Show items"}
                    >
                      <ChevronDown
                        className={`w-4 h-4 text-blue-600 transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>

              {/* Expanded Sub-items Preview */}
              {isSelected && isExpanded && hasSubItems && (
                <div className="bg-blue-50 border-t border-blue-100 px-4 py-3 space-y-2">
                  {room.subItems.map((item) => {
                    const isItemSelected = selectedItems.includes(item);
                    return (
                      <div
                        key={item}
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => toggleSubItem(room.id, item)}
                      >
                        {/* Sub-item Checkbox - shadcn */}
                        <Checkbox
                          checked={isItemSelected}
                          onCheckedChange={() => toggleSubItem(room.id, item)}
                          onClick={(e) => e.stopPropagation()}
                          className="cursor-pointer"
                        />
                        <span
                          className={`text-xs ${
                            isItemSelected
                              ? "text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <FieldError message={errors.selectedRooms} />

      {/* Sub-items Dialog */}
      {activeRoom && (
        <SubItemsDialog
          room={activeRoom}
          selectedItems={subSelections[activeRoom.id] || []}
          onToggle={(item) => toggleSubItem(activeRoom.id, item)}
          onClose={() => setSelectedRoomId(null)}
        />
      )}
    </div>
  );
}