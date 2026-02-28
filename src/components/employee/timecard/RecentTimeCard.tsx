import { format } from "date-fns";
import React from "react";

export default function RecentTimeCard({ data }: { data: any }) {
  const {
    project,
    totalHours,
    normalHours,
    overtimeHours,
    doubleOvertimeHours,
  } = data;
  return (
    <div className="border rounded-lg p-5 bg-white space-y-4 shadow flex ">
      <div className="flex-1 space-y-3">
        <h1 className="font-semibold text-base text-neutral-600">
          {project?.name}
        </h1>
        <p className=" text-sm text-neutral-500">
          {format(new Date(project.createdAt), "PPP")}
        </p>
      </div>
      <div className="text-left">
        <p className="font-semibold text-green-400"> {totalHours}h</p>
        <p className="font-semibold text-purple-400"> {overtimeHours}h</p>
        <p className="font-semibold text-blue-400"> {doubleOvertimeHours}h</p>
      </div>
    </div>
  );
}
