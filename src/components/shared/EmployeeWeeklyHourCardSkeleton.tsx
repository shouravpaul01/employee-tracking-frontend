"use client";
import React from "react";

export default function EmployeeWeeklyHourCardSkeleton() {
  return (
    <div className="bg-slate-50 border rounded-lg p-4 flex items-center gap-3.5 animate-pulse">
      <div className="size-3 bg-gray-300 rounded-full" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-300 rounded" />

        <div className="flex items-center gap-2">
          <div className="h-3 w-16 bg-gray-300 rounded" />
          <div className="h-3 w-[1px] bg-gray-300" />
          <div className="h-3 w-12 bg-gray-300 rounded" />
          <div className="h-3 w-[1px] bg-gray-300" />
          <div className="h-3 w-10 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
}