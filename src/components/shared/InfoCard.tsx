import React from "react";

type Props = {
  title: string;
  info: string;
  icon: React.ReactNode;
};

export default function InfoCard({ title, info, icon }: Props) {
  return (
    <div className="border rounded-lg p-4 bg-white space-y-2 shadow">
      <div className="flex items-center gap-2.5 text-neutral-700 font-semibold">
        {icon}
        {title}
      </div>
      <p className="text-sm text-neutral-600">{info}</p>
    </div>
  );
}