import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Mail, ShieldCheck, User } from "lucide-react";

export function UserProfileCard({
  wrapperClassName,
  isHideRoleBadge = false,
  data,
}: {
  wrapperClassName?: string;
  isHideRoleBadge?: boolean;
  data: any;
}) {
  const { name, email, role, photo } = data;
  return (
    <div className={cn("bg-white border rounded-lg p-5", wrapperClassName)}>
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={photo} alt={name} />
          <AvatarFallback className="bg-primary/20 text-primary text-lg">
            <User />
          </AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-0">{name || "N/A"}</h3>

          <p className="text-neutral-600 py-1 flex items-center gap-2">
            
            {email}
          </p>

          {!isHideRoleBadge && (
            <div className="text-primary font-semibold flex items-center gap-2">
              <ShieldCheck className="size-5" />
              {role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
