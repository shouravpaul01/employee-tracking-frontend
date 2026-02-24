// components/new-project-dialog.tsx
"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  projectName: z.string().min(1, "Project name is required"),
  propertyAddress: z.string().min(1, "Property address is required"),
  clientName: z.string().min(1, "Client name is required"),
  status: z.string().min(1, "Status is required"),
  lockboxInfo: z.string().optional(),
  additionalNotes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

const projectStatuses = [
  "Walkthrough",
  "Staging",
  "Destaging",
  "Completed",
  "Pending",
  "On Hold",
]

export function CreateProjectFormDialog({open,onOpenChange}:{open:boolean,onOpenChange:(value:boolean)=>void}) {

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
      propertyAddress: "",
      clientName: "",
      status: "Walkthrough",
      lockboxInfo: "",
      additionalNotes: "",
    },
  })

  const selectedStatus = watch("status")

  function onSubmit(data: FormValues) {
    toast("New project created!", {
      description: (
        <div className="mt-2 w-full">
          <p><strong>{data.projectName}</strong> has been created successfully.</p>
        </div>
      ),
      position: "bottom-right",
    })
    
    console.log("Form data:", data)
    onOpenChange(false)
    reset()
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
                <FieldLabel htmlFor="projectName" className="text-base ">
                  Project Name
                </FieldLabel>
                
                <Input
                  id="projectName"
                  placeholder="e.g Del Mar Coastal Villa"
                  {...register("projectName")}
                  className={errors.projectName ? "border-red-500" : ""}
                />
                {errors.projectName && (
                  <FieldError errors={[errors.projectName]} />
                )}
              </Field>

              {/* Property Address */}
              <Field>
                <FieldLabel htmlFor="propertyAddress" className="text-base ">
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
                <FieldLabel htmlFor="clientName" className="text-base ">
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
                <FieldLabel htmlFor="status" className="text-base ">
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
                    {projectStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.status && (
                  <FieldError errors={[errors.status]} />
                )}
              </Field>

              {/* Lockbox/Access Info */}
              <Field>
                <FieldLabel htmlFor="lockboxInfo" className="text-base ">
                  Lockbox/Access Info
                </FieldLabel>
                
                <Input
                  id="lockboxInfo"
                  placeholder="Code: 1234, front gate"
                  {...register("lockboxInfo")}
                />
              </Field>

              {/* Additional Notes */}
              <Field>
                <FieldLabel htmlFor="additionalNotes" className="text-base ">
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
  )
}