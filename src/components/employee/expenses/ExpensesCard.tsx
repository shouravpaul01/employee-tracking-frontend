import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

type ExpenseCardProps = {
  icon: ReactNode;
  title: string;
  address?: string;
  description?: string;
  amount: number | string;
  status: "Approved" | "Pending" | "Rejected";
  note?: string;
};

export const ExpenseCard = ({
  icon,
  title,
  address,
  description,
  amount,
  status,
  note,
}: ExpenseCardProps) => {
  return (
    <div className="bg-white border rounded-lg p-3 ">

    <div className="flex gap-3 items-start">
          <div className="bg-gray-100 rounded-lg p-3">{icon}</div>


      <div className="flex-1">
        <h6 className="text-lg text-neutral-700 font-semibold">{title}</h6>

        {address && (
          <p className="text-neutral-500 text-sm mb-1">{address}</p>
        )}

        {description && (
          <p className="text-neutral-500 text-sm mt-2">{description}</p>
        )}
      </div>

     
      <div className="text-right space-y-2">
        <h6 className="text-lg font-semibold">${amount}</h6>

        <Badge
          variant="outline"
          className="bg-primary/10 border border-primary text-primary py-1 px-2"
        >
          {status}
        </Badge>
      </div>
    </div>

     
      {note && (
        <div className="w-full inline-flex items-center bg-red-100 text-red-500 text-sm px-2 py-1 rounded mt-3">
          {note}
        </div>
      )}
    </div>
  );
};