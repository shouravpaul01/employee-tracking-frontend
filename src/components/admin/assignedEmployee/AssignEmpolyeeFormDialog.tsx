"use client";
import * as React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { assignEmployeeSchema } from "@/validation/assignedEmployeee.validation";
import { useGetAllUsersQuery } from "@/redux/api/userApi";
import { assignedEmployeeRoles } from "@/constant";
import { User } from "@/type";
import { useAssignEmployeeMutation } from "@/redux/api/assingedEmployeeApi";

interface AssignEmployeeDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  projectId?: string;
}

export function AssignEmployeeFormDialog({
  open,
  onOpenChange,
  projectId,
}: AssignEmployeeDialogProps) {
  const { data, isLoading: isEmployeesLoading } = useGetAllUsersQuery({
    limit: 200,
  });
  const employees = data?.data;

  const [assignEmployee, { isLoading }] = useAssignEmployeeMutation();
  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(assignEmployeeSchema),
    defaultValues: {
      projectId: projectId!,
      employeeId: "",
      role: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      console.log("Assigning employee:", data);
      // Add your API call here
      await assignEmployee(data).unwrap();

      toast.success("Employee assigned successfully!");
      onOpenChange(false);
      reset();
    } catch (error: any) {
      toast.error("Failed to assign employee. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-semibold">
            Assign Employee
          </DialogTitle>
          <DialogDescription>
            Select an employee and assign their role for this project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="px-6 py-6 space-y-6">
            <FieldGroup>
              {/* Employee Selection */}
              <Field>
                <FieldLabel
                  htmlFor="employee"
                  className="text-base font-medium"
                >
                  Employee <span className="text-red-500">*</span>
                </FieldLabel>

                <Controller
                  name="employeeId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger
                        className={errors.employeeId ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select an employee" />
                      </SelectTrigger>
                      <SelectContent>
                        {employees?.map((employee: User) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.employeeId && (
                  <FieldError errors={[errors.employeeId]} />
                )}
              </Field>

              {/* Role Selection */}
              <Field>
                <FieldLabel htmlFor="role" className="text-base font-medium">
                  Role <span className="text-red-500">*</span>
                </FieldLabel>
                <p className="text-sm text-muted-foreground mb-2">
                  Select The Role
                </p>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value || undefined}
                    >
                      <SelectTrigger
                        className={errors.role ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignedEmployeeRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && <FieldError errors={[errors.role]} />}
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t">
            <Button type="submit" className="w-full" size="lg">
              Assign Employee
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
