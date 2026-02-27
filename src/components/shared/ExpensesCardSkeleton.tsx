"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ExpensesCardSkeletonProps {
  className?: string;
}

export default function ExpensesCardSkeleton({ className }: ExpensesCardSkeletonProps) {
  return (
    <Card className={className}>
      <CardContent className="px-4">
        <div className="space-y-3 animate-pulse">
          {/* Top row (amount + badge) */}
          <div className="flex items-center">
            <div className="h-8 w-20 bg-gray-300 rounded-md flex-1"></div>
            <Badge className="h-6 w-16 bg-gray-300 border-none text-transparent ml-2" />
          </div>

          {/* Details */}
          <div className="space-y-1 text-sm">
            <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            <div className="h-3 w-3/4 bg-gray-300 rounded"></div>
            <div className="h-3 w-full bg-gray-300 rounded"></div>
          </div>

          {/* View button */}
          <div className="h-8 w-20 bg-gray-300 rounded"></div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <div className="h-8 flex-1 bg-gray-300 rounded"></div>
            <div className="h-8 flex-1 bg-gray-300 rounded"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}