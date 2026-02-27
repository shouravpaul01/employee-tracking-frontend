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
import { ExpensesStatus } from "@/type";
import { useUpdateExpenseStatusMutation } from "@/redux/api/expensesApi";

export function RejectedFeedbackForm({
  id,
  status,
  openDialog,
  onOpenDialogChange,
}: {
  id: string;
  status: ExpensesStatus;
  openDialog: boolean;
  onOpenDialogChange: (value: boolean) => void;
}) {
  const [updateExpenseStatus, { isLoading }] = useUpdateExpenseStatusMutation();
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

  const onSubmit = async (data: FieldValues) => {
    console.log({
        id,
        status,
        feedback: data.feedback,
      })
    try {
      await updateExpenseStatus({
        id,
        status,
        feedback: data.feedback,
      }).unwrap();

      toast.success("Rejected with feedback");
      onOpenDialogChange(false);
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit feedback");
    }
  };

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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
