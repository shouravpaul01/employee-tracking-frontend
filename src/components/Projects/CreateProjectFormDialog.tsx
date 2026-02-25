// components/new-project-dialog.tsx
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectStatus } from "@/constant";
import { createProjectSchema } from "@/validation/project.validation";

export function CreateProjectFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      propertyAddress: "",
      clientName: "",
      status: "Walkthrough",
      accessInfo: "",
      additionalNotes: "",
    },
  });

  const selectedStatus = watch("status");

  function onSubmit(data: FieldValues) {
    toast("New project created!", {
      description: (
        <div className="mt-2 w-full">
          <p>
            <strong>{data.projectName}</strong> has been created successfully.
          </p>
        </div>
      ),
      position: "bottom-right",
    });

    console.log("Form data:", data);
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        {/* Fixed Header */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-bold">New Project</DialogTitle>
          <DialogDescription>
            Fill in the project details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Scrollable Content */}
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <FieldGroup className="">
              {/* Project Name */}
              <Field>
                <FieldLabel htmlFor="projectName" className=" ">
                  Project Name
                </FieldLabel>

                <Input
                  id="projectName"
                  placeholder="e.g Del Mar Coastal Villa"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <FieldError errors={[errors.name]} />
                )}
              </Field>

              {/* Property Address */}
              <Field>
                <FieldLabel htmlFor="propertyAddress" >
                  Property Address
                </FieldLabel>

                <Input
                  id="propertyAddress"
                  placeholder="1234 Ocean Blvd, Del Mar, CA"
                  {...register("propertyAddress")}
                  className={errors.propertyAddress ? "border-red-500" : ""}
                />
                {errors.propertyAddress && (
                  <FieldError errors={[errors.propertyAddress]} />
                )}
              </Field>

              {/* Client Name */}
              <Field>
                <FieldLabel htmlFor="clientName" >
                  Client Name
                </FieldLabel>

                <Input
                  id="clientName"
                  placeholder="Sarah Johnson"
                  {...register("clientName")}
                  className={errors.clientName ? "border-red-500" : ""}
                />
                {errors.clientName && (
                  <FieldError errors={[errors.clientName]} />
                )}
              </Field>

              {/* Status */}
              <Field>
                <FieldLabel htmlFor="status" >
                  Status
                </FieldLabel>

                <Select
                  onValueChange={(value) => setValue("status", value)}
                  defaultValue={selectedStatus}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectStatus.map((status) => (
                      <SelectItem key={status} value={status.toUpperCase()}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && <FieldError errors={[errors.status]} />}
              </Field>

              {/* Lockbox/Access Info */}
              <Field>
                <FieldLabel htmlFor="lockboxInfo" >
                  Lockbox/Access Info
                </FieldLabel>

                <Input
                  id="lockboxInfo"
                  placeholder="Code: 1234, front gate"
                  {...register("accessInfo")}
                />
              </Field>

              {/* Additional Notes */}
              <Field>
                <FieldLabel htmlFor="additionalNotes" >
                  Add Additional Notes
                </FieldLabel>

                <Textarea
                  id="additionalNotes"
                  placeholder="Add extra notes about this project.."
                  className="min-h-[100px]"
                  {...register("additionalNotes")}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Fixed Footer */}
          <DialogFooter className="px-6 py-4 border-t flex gap-2 sm:justify-between">
            <Button type="submit" className="w-full">
              Create Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
