import React from "react";

type Props = {
  icon?: React.ReactNode;
  iconClassName?: string;
  count: number | string;
  title: string;
};

export default function StateCount({
  icon,
  iconClassName,
  count,
  title,
}: Props) {
  return (
    <div className="bg-white p-4 border rounded-lg flex flex-col items-center ">
      
      {/* Icon Circle */}
      {
        icon && <div
        className={`w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 ${iconClassName}`}
      >
        {icon}
      </div>
      }

      {/* Count */}
      <h5 className="font-bold text-lg text-neutral-800">{count}</h5>

      {/* Title */}
      <span className="text-xs text-neutral-500">{title}</span>
    </div>
  );
}