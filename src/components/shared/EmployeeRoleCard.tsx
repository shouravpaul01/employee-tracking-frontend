"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRound } from "lucide-react";
import { useUpdateAssignedEmployeeRoleMutation } from "@/redux/api/assingedEmployeeApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { assignedEmployeeRoles } from "@/constant";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

interface EmployeeRoleCardProps {
  employee: {
    id: string;
    role: string;
    photo?: string | null;
    employee?: {
      id: string;
      name: string;
    };
  };
}

export default function EmployeeRoleCard({ employee }: EmployeeRoleCardProps) {
  const [updateAssignedEmployeeRole, { isLoading }] =
    useUpdateAssignedEmployeeRoleMutation();

  const { user } = useAppSelector((state: RootState) => state.auth);

  const handleChange = async (value: string) => {
    try {
      await updateAssignedEmployeeRole({
        id: employee?.id,
        data: { role: value },
      }).unwrap();
      toast.success("Role updated successfully");
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  // Determine if the role select should be shown
  const canEditRole =
    user?.role === "ADMIN" || user?.id === employee?.employee?.id;

  return (
    <div className="flex items-center p-2 bg-white rounded-lg">
      <div className="flex-1 flex items-center gap-3">
        <Avatar className="size-16">
          <AvatarImage
            src={employee?.photo || ""}
            alt={employee?.employee?.name || "Employee"}
          />
          <AvatarFallback>
            <UserRound />
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h6 className="text-neutral-700 font-semibold">
            {employee?.employee?.name}
          </h6>
          <Badge variant="secondary" className="py-1">
            {employee?.role}
          </Badge>
        </div>
      </div>

      {canEditRole && (
        <div>
          <Select
            defaultValue={employee?.role}
            onValueChange={handleChange}
            disabled={isLoading}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>

            <SelectContent>
              {assignedEmployeeRoles.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}