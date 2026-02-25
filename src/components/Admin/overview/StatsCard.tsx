import { cn } from "@/lib/utils";
import React from "react";

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconClassName?: string;
};

export default function StatsCard({
  title,
  value,
  icon,
  iconClassName,
}: StatsCardProps) {
  return (
    <div className="border bg-white rounded-lg p-5 flex items-center justify-between">
      <div>
        <h5 className="text-sm font-medium text-neutral-500">{title}</h5>
        <h5 className="font-bold text-xl text-neutral-800">{value}</h5>
      </div>

      {/* Right Icon */}
      <div
        className={cn("bg-primary/10 text-primary rounded-md p-4 ",iconClassName)}
      >
        {icon}
      </div>
    </div>
  );
}
