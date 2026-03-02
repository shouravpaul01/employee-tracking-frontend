"use client";

import * as React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Eye, EyeOff } from "lucide-react";

import { useChangePasswordMutation } from "@/redux/api/authApi";
import { changePasswordSchema } from "@/validation/auth.validation";

export function ChangePasswordFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const [showCurrent, setShowCurrent] = React.useState(false);
  const [showNew, setShowNew] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await changePassword({ password: data.newPassword }).unwrap();
      toast.success("Password updated successfully!");
      reset();
      onOpenChange(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to update password", {
        description: error?.data?.message || "Something went wrong",
      });
    }
  };

  const renderPasswordField = (
    label: string,
    fieldName: "currentPassword" | "newPassword" | "confirmPassword",
    show: boolean,
    setShow: React.Dispatch<React.SetStateAction<boolean>>
  ) => (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        <Input
          type={show ? "text" : "password"}
          placeholder={`Enter ${label.toLowerCase()}`}
          {...register(fieldName)}
          className={errors[fieldName] ? "border-red-500" : ""}
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-0"
          onClick={() => setShow((prev) => !prev)}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </Button>
      </div>
      {errors[fieldName] && <FieldError errors={[errors[fieldName]]} />}
    </Field>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="py-4 ">
            {renderPasswordField(
              "Current Password",
              "currentPassword",
              showCurrent,
              setShowCurrent
            )}
            {renderPasswordField(
              "New Password",
              "newPassword",
              showNew,
              setShowNew
            )}
            {renderPasswordField(
              "Confirm Password",
              "confirmPassword",
              showConfirm,
              setShowConfirm
            )}
          </FieldGroup>

          <DialogFooter className="space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                onOpenChange(false);
              }}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Change Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}