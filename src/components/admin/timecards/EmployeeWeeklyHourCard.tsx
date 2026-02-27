
import { Button } from "@/components/ui/button";
import React from "react";

export default function EmployeeWeeklyHourCard() {
  return (
    <div className="bg-slate-50 border rounded-lg p-4 flex items-center gap-3.5">
      <div className="size-3 bg-green-600 rounded-full" />
      <div className="flex-1">
        <h1 className="font-medium text-neutral-700">Jhon de</h1>
        <div className="flex items-center gap-2 text-neutral-600 text-sm">
          <span>$300</span>

          <div className="h-3 w-[1px] bg-gray-400" />

          <span>30h reg</span>

          <div className="h-3 w-[1px] bg-gray-400" />

          <span>6h OT</span>
        </div>
      </div>
     <div>
       <Button size={"sm"}>Approved</Button>
     </div>
    </div>
  );
}
