"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, Clock, Receipt, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";


const menuConfig = {
  ADMIN: [
    { id: "projects", label: "Project", icon: Home, path: "/admin/projects" },
    { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
    { id: "timecards", label: "Timecards", icon: Clock, path: "/admin/timecards" },
    { id: "expenses", label: "Expenses", icon: Receipt, path: "/admin/expenses" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ],
  EMPLOYEE: [
    { id: "projects", label: "Project", icon: Home, path: "/employee/projects" },
    { id: "calendar", label: "Calendar", icon: Calendar, path: "/calendar" },
    { id: "timecards", label: "Timecards", icon: Clock, path: "/employee/timecards" },
    { id: "expenses", label: "Expenses", icon: Receipt, path: "/employee/expenses" },
    { id: "profile", label: "Profile", icon: User, path: "/profile" },
  ],
};

export function MenuBar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAppSelector((state: RootState) => state.auth);
  const role = user?.role as "ADMIN" | "EMPLOYEE";

  // fallback empty
  const menuItems = role ? menuConfig[role] : [];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
      <div className="max-w-md mx-auto flex justify-between px-2 py-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const isActive = pathname.startsWith(item.path);

          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => router.push(item.path)}
              className={`
                flex flex-col items-center justify-center gap-1 flex-1 h-auto py-2
                transition-all duration-200
                ${
                  isActive
                    ? "text-primary bg-primary/10 rounded-md"
                    : "hover:bg-primary/10 hover:rounded-md hover:text-primary"
                }
              `}
            >
              <Icon
                className={`size-5 transition-all ${
                  isActive ? "text-primary scale-110" : ""
                }`}
              />
              <span className="text-[11px]">{item.label}</span>

              <div
                className={`
                  mt-1 h-1 w-6 rounded-full transition-all
                  ${isActive ? "bg-primary" : "bg-transparent"}
                `}
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}