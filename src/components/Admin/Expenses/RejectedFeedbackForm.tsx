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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { rejectedFeedbackSchema } from "@/validation/expenses.validation";




export function RejectedFeedbackForm({
  openDialog,
  onOpenDialogChange,
}: {
  openDialog: boolean;
  onOpenDialogChange: (value: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(rejectedFeedbackSchema),
    defaultValues: {
      feedback: "",
    },
  });

  function onSubmit(data: FieldValues) {
    toast.success("Feedback sent!");
    console.log("Feedback:", data);
    onOpenDialogChange(false);
    reset();
  }

  return (
    <Dialog open={openDialog} onOpenChange={onOpenDialogChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="space-y-4 py-4">
            <Field>
              <FieldLabel htmlFor="feedback">Write Your Feedback...</FieldLabel>
              <Textarea
                id="feedback"
                placeholder="Type your feedback here..."
                className={`mt-2 ${errors.feedback ? "border-red-500" : ""}`}
                {...register("feedback")}
              />
              {errors.feedback && <FieldError errors={[errors.feedback]} />}
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button type="submit" className="w-full">Send</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
