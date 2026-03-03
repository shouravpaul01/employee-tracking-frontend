export const NotificationCardSkeleton = () => (
  <div className="bg-white border border-border rounded-lg p-4 flex gap-4 animate-pulse">
    <div className="flex-shrink-0 bg-primary/10 rounded-full w-12 h-12" />
    <div className="flex-1 space-y-2">
      <div className="h-4 bg-neutral-200 rounded w-1/2" />
      <div className="h-3 bg-neutral-200 rounded w-full" />
    </div>
  </div>
);
