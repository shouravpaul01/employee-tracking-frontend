"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ROOMS } from "@/constant";

interface SubItemsDialogProps {
  room: (typeof ROOMS)[0];
  selectedItems: string[];
  onToggle: (item: string) => void;
  onClose: () => void;
}

export default function SubItemsDialog({
  room,
  selectedItems,
  onToggle,
  onClose,
}: SubItemsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{room.label}</DialogTitle>
        </DialogHeader>
        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto space-y-2">
          {room.subItems.map((item) => {
            const checked = selectedItems.includes(item);
            return (
              <div
                key={item}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                onClick={() => onToggle(item)}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(item)}
                  onClick={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                />
                <span
                  className={`text-sm ${
                    checked ? "text-gray-900 font-medium" : "text-gray-600"
                  }`}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
        <DialogFooter className="px-6 py-4 ">
          <Button
          onClick={onClose}
          className="w-full"
        >
          Done
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}