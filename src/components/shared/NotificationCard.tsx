import { Notification } from "@/type";
import { BellRing } from "lucide-react";
import React from "react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationCard({ data }: { data: Notification }) {
  const { title, message, createdAt } = data;

  return (
    <div className="bg-white border border-border rounded-lg p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
     <div className="flex-shrink-0">
         <div className=" bg-primary/10 p-3 rounded-full text-primary flex items-center justify-center">
        <BellRing className="w-5 h-5" />
      </div>
     </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h6 className="font-semibold text-neutral-800">{title}</h6>
          {createdAt && (
            <span className="text-xs text-neutral-400 ml-2 w-[70px]">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </span>
          )}
        </div>
        <p className="text-neutral-500 mt-1 text-sm">{message}</p>
      </div>
    </div>
  );
}