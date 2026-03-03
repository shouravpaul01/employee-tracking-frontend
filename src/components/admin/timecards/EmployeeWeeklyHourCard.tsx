import React from "react";

interface EmployeeSummary {
  employee: {
    id: string;
    name: string;
    email: string;
    phone: string | null;
    photo: string | null;
  };
  totalHours: number;
  normalHours: number;
  overtimeHours: number;
  doubleOvertimeHours: number;
}

export default function EmployeeWeeklyHourCard({
  data,
}: {
  data: EmployeeSummary;
}) {
  const {
    employee: { name },
    totalHours,
    normalHours,
    overtimeHours,
    doubleOvertimeHours,
  } = data;

  return (
    <div className="bg-slate-50 border rounded-lg p-4 flex items-center gap-3.5">
      <div className="size-3 bg-green-600 rounded-full" />

      <div className="flex-1">
        <h1 className="font-medium text-neutral-700">{name}</h1>

        <div className="flex items-center gap-2 text-neutral-600 text-sm">
          <span>{totalHours.toFixed(2)}h total</span>

          <div className="h-3 w-[1px] bg-gray-400" />

          <span>{normalHours.toFixed(2)}h reg</span>

          <div className="h-3 w-[1px] bg-gray-400" />

          <span>{overtimeHours.toFixed(2)}h OT</span>

          {doubleOvertimeHours > 0 && (
            <>
              <div className="h-3 w-[1px] bg-gray-400" />
              <span>{doubleOvertimeHours.toFixed(2)}h DOT</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}