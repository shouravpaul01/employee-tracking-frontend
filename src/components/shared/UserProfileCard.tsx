
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

import { Mail, ShieldCheck, User } from "lucide-react";

export function UserProfileCard({wrapperClassName,isHideRoleBadge=false}:{wrapperClassName?:string,isHideRoleBadge?:boolean}) {

  return (
    <div className={cn("bg-white border rounded-lg p-5 ",wrapperClassName)}>
     
        <div className="flex items-center gap-4">
          {/* Avatar with initials */}
          <Avatar className="h-16 w-16">
            <AvatarImage src="" alt="Mike Rodriguez" />
            <AvatarFallback className="bg-primary/20 text-primary  text-lg">
              <User />
            </AvatarFallback>
          </Avatar>

          {/* User Info */}
          <div className="flex-1 ">
            <h3 className="font-semibold text-lg mb-0">Mike Rodriguez</h3>

            <p className="text-neutral-600 py-1">mike@stagingpro.com</p>
            {
              isHideRoleBadge && <div className="text-primary font-semibold flex items-center gap-2 ">
              <ShieldCheck className="size-5" />
              Admin
            </div>
            }
          </div>
        </div>
   
    </div>
  );
}
