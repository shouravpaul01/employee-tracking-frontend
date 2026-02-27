"use client";

import { Badge } from "@/components/ui/badge";
import { expensesCategory, statusColors } from "@/constant";
import { cn } from "@/lib/utils";
import { Expenses } from "@/type";
import { formatStatus } from "@/utils/formatStatus";

export const ExpenseCard = ({ data }: { data: Expenses }) => {
  const { category, status, description, amount, employee, project, feedback } = data;

  // Find icon component
  const categoryObj = expensesCategory.find((cat) => cat.value === category);
  const IconComponent = categoryObj?.icon;

  return (
    <div className="bg-white border rounded-lg p-3">
      <div className="flex gap-3 items-start">
        {/* Icon */}
        <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
          {IconComponent && <IconComponent className="size-6 text-gray-600" />}
        </div>

        {/* Details */}
        <div className="flex-1">
          <h6 className="text-lg text-neutral-700 font-semibold">{ category}</h6>

          {project && <p className="text-neutral-500 text-sm mb-1">{project.name}</p>}
          {description && <p className="text-neutral-500 text-sm mt-2">{description}</p>}
        </div>

        {/* Amount + Status */}
        <div className="text-right space-y-2">
          <h6 className="text-lg font-semibold">${amount.toFixed(2)}</h6>
          <Badge variant="outline" className={cn("py-1 px-2", statusColors[status])}>
            {formatStatus(status)}
          </Badge>
        </div>
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="w-full inline-flex items-center bg-red-100 text-red-500 text-sm px-2 py-1 rounded mt-3">
          {feedback}
        </div>
      )}
    </div>
  );
};