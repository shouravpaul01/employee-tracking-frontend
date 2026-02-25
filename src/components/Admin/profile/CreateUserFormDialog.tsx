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

const formSchema = z.object({
  userName: z.string().min(1, "User name is required"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email"),
})

type FormValues = z.infer<typeof formSchema>

export function CreateUserFormDialog({
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
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      email: "",
    },
  })

  function onSubmit(data: FormValues) {
    toast.success("User created!", {
      description: `${data.userName} has been added successfully.`,
    })
    
    console.log("User data:", data)
    onOpenChange(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
     
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
         
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className=" py-4">
            {/* User Name Field */}
            <Field>
              <FieldLabel htmlFor="userName" className="text-base">
                User Name
              </FieldLabel>
            
              <Input
                id="userName"
                placeholder="Enter user name"
                {...register("userName")}
                className={errors.userName ? "border-red-500" : ""}
              />
              {errors.userName && (
                <FieldError errors={[errors.userName]} />
              )}
            </Field>

            {/* Email Field */}
            <Field>
              <FieldLabel htmlFor="email" className="text-base">
                Email
              </FieldLabel>
             
              <Input
                id="email"
                type="email"
                placeholder="Enter Email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <FieldError errors={[errors.email]} />
              )}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                onOpenChange(false)
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              Create User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}