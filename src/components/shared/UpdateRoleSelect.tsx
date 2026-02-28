"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { assignedEmployeeRoles } from "@/constant";
import { useUpdateAssignedEmployeeRoleMutation } from "@/redux/api/assingedEmployeeApi";
import { toast } from "sonner";

export default function UpdateRoleSelect({
  id,
  defaultRole,
}: {
  id: string;
  defaultRole: string;
}) {
  const [updateAssignedEmployeeRole, { isLoading }] =
    useUpdateAssignedEmployeeRoleMutation();

  const handleChange = async (value: string) => {
    try {
      console.log(value, id);
      await updateAssignedEmployeeRole({
        id,
        data: { role: value },
      }).unwrap();

      toast.success("Role updated successfully ");
    } catch (error) {
      toast.error("Failed to update role ");
    }
  };

  return (
    <Select
      defaultValue={defaultRole}
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
  );
}
