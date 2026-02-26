"use client";

export default function ProjectCardSkeleton() {
  return (
    <div className="bg-white p-4 border rounded-lg space-y-3 animate-pulse">
      
      {/* Header */}
      <div className="flex">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-3 w-24 bg-gray-200 rounded" />
        </div>

        <div className="flex gap-2 items-center">
          <div className="h-6 w-20 bg-gray-200 rounded" />
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
        </div>
      </div>

      {/* Middle Info */}
      <div className="flex gap-4">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-16 bg-gray-200 rounded" />
      </div>

      {/* Location */}
      <div className="h-4 w-28 bg-gray-200 rounded" />
    </div>
  );
}