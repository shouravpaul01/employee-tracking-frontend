import { UserProfileCard } from "@/components/shared/UserProfileCard";
import Header from "@/components/shared/Header";
import { MenuQuickActions } from "@/components/shared/MenuQuickActions";
import StateCount from "@/components/shared/StateCount";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div>
      <Header title="Profile" />
      <div className="container space-y-4">
        <UserProfileCard isHideRoleBadge={true} />
        <div className="grid grid-cols-3 gap-2.5">
            <StateCount count={`50`} title="Projects" />
            <StateCount count={`50`} title="This Month" />
            <StateCount count={`50`} title="Expenses" />
        </div>
        <MenuQuickActions/>
        <Button variant={"outline"} className="w-full bg-red-100 border-red-400 text-red-400 hover:bg-red-200 hover:border-red-400 hover:text-red-400" ><LogOut/> Logout</Button>
      </div>
    </div>
  );
}
