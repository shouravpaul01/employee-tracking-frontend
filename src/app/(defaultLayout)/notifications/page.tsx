"use client";

import Header from "@/components/shared/Header";
import NotificationCard from "@/components/shared/NotificationCard";
import { NotificationCardSkeleton } from "@/components/shared/NotificationCardSkeleton";

import { useGetAllMyNotificationsQuery } from "@/redux/api/notificationApi";
import { Notification } from "@/type";
import { BellRing } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useGetAllMyNotificationsQuery({ limit: 300 });
  const notifications = data?.data || [];

  return (
    <div>
      <Header title="Notifications" backHref="/profile" />
      <div className="container space-y-4 py-4">
        {isLoading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <NotificationCardSkeleton key={idx} />
          ))}

        {!isLoading && notifications.length === 0 && (
          <div className="flex flex-col items-center justify-center text-neutral-400 mt-10 space-y-2">
            <BellRing className="w-10 h-10" />
            <p>No notifications yet</p>
          </div>
        )}

        {!isLoading &&
          notifications.map((notif:Notification) => (
            <NotificationCard key={notif.id} data={notif} />
          ))}
      </div>
    </div>
  );
}