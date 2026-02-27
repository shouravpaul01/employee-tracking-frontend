"use client";

import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { Input } from "@/components/ui/input";
import { useRegisterUserMutation } from "@/redux/api/authApi";
import { registerSchema } from "@/validation/auth.validation";
import { TValidatorError } from "@/type";

const DEFAULT_PASSWORD = "@12345678";

export function CreateUserFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: DEFAULT_PASSWORD,
    },
  });

  const onSubmit = async (data: FieldValues) => {
    try {
      await registerUser(data).unwrap();

      toast.success("User created!", {
        description: `Default password: ${DEFAULT_PASSWORD}`,
      });

      onOpenChange(false);
      reset();
    } catch (error: any) {
      console.log(error);
      if (error?.data?.message === "Validation Error") {
        error?.data?.errorMessages?.map((validatorErr: TValidatorError) =>
          setError(validatorErr?.path, { message: validatorErr.message }),
        );
      } else {
        toast.error("Failed to create user", {
          description: error?.data?.message || "Something went wrong",
        });
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="py-4 ">
            {/* User Name */}
            <Field>
              <FieldLabel>User Name</FieldLabel>
              <Input
                placeholder="Enter user name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <FieldError errors={[errors.name]} />}
            </Field>

            {/* Email */}
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="Enter email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input type="text" value={DEFAULT_PASSWORD} disabled />
            </Field>
          </FieldGroup>

          <DialogFooter>
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
              {isLoading ? "Creating..." : "Create User"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
