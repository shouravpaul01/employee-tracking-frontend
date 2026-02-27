"use client";
import * as React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

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
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "@/redux/api/projectApi";
import { TValidatorError, Project } from "@/type";

interface CreateProjectFormDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  project?: Project; // Optional project for update
}

export function CreateProjectFormDialog({
  open,
  onOpenChange,
  project,
}: CreateProjectFormDialogProps) {
  const isEditMode = Boolean(project?.id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    control,
  } = useForm({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: project?.name ?? "",
      propertyAddress: project?.propertyAddress ?? "",
      clientName: project?.clientName ?? "",
      status: project?.status ?? "",
      accessInfo: project?.accessInfo ?? "",
      notes: project?.notes ?? "",
    },
  });

  const [createProject, { isLoading: creating }] = useCreateProjectMutation();
  const [updateProject, { isLoading: updating }] = useUpdateProjectMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      if (isEditMode && project?.id) {
        // Update project
        await updateProject({ id: project.id, data }).unwrap();
        toast.success("Project updated successfully!");
      } else {
        // Create project
        await createProject(data).unwrap();
        toast.success("Project created successfully!");
      }
      onOpenChange(false);
      reset();
    } catch (error: any) {
      if (error?.data?.message === "Validation Error") {
        error?.data?.errorMessages?.forEach((validatorErr: TValidatorError) =>
          setError(validatorErr?.path, { message: validatorErr.message })
        );
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-lg font-bold">
            {isEditMode ? "Edit Project" : "New Project"}
          </DialogTitle>
          <DialogDescription>
            Fill in the project details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <FieldGroup>
              {/* Project Name */}
              <Field>
                <FieldLabel htmlFor="projectName">Project Name</FieldLabel>
                <Input
                  id="projectName"
                  placeholder="e.g Del Mar Coastal Villa"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && <FieldError errors={[errors.name]} />}
              </Field>

              {/* Property Address */}
              <Field>
                <FieldLabel htmlFor="propertyAddress">
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
                <FieldLabel htmlFor="clientName">Client Name</FieldLabel>
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
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} onValueChange={field.onChange}>
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
                  )}
                />
                {errors.status && <FieldError errors={[errors.status]} />}
              </Field>

              {/* Lockbox/Access Info */}
              <Field>
                <FieldLabel htmlFor="lockboxInfo">Lockbox/Access Info</FieldLabel>
                <Input
                  id="lockboxInfo"
                  placeholder="Code: 1234, front gate"
                  {...register("accessInfo")}
                />
              </Field>

              {/* Additional Notes */}
              <Field>
                <FieldLabel htmlFor="additionalNotes">
                  Add Additional Notes
                </FieldLabel>
                <Textarea
                  id="additionalNotes"
                  placeholder="Add extra notes about this project.."
                  className="min-h-[100px]"
                  {...register("notes")}
                />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t flex gap-2 sm:justify-between">
            <Button type="submit" className="w-full" disabled={creating || updating}>
              {creating || updating
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update Project"
                : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}