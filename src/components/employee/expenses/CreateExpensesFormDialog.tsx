"use client";

import * as React from "react";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";

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
import { expensesCategory } from "@/constant";
import { createExpenseSchema } from "@/validation/expenses.validation";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useCreateExpenseMutation } from "@/redux/api/expensesApi";
import { Spinner } from "@/components/ui/spinner";
import { TValidatorError } from "@/type";

export function CreateExpenseFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [createExpense, { isLoading: isCreateLoading }] =
    useCreateExpenseMutation();
  const { data, isLoading } = useGetAllProjectsQuery({ limit: 500 });
  const projects = data?.data ?? [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: undefined,
      category: "",
      projectId: "",
      description: "",
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setReceiptFile(file);
    clearErrors("receiptDocImage")
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      // FormData for file upload
      const formData = new FormData();

      if (!receiptFile) {
        setError("receiptDocImage", { message: "File is required." });
        return
      }
      formData.append("receiptDocImage", receiptFile);
      formData.append("bodyData", JSON.stringify(data));
      await createExpense(formData).unwrap();

      toast.success("Expense submitted!", {
        description: `$${data.amount} expense has been recorded.`,
      });

      onOpenChange(false);
      reset();
      setReceiptFile(null);
    } catch (error: any) {
      if (error?.data?.message === "Validation Error") {
        error?.data?.errorMessages?.map((validatorErr: TValidatorError) =>
          setError(validatorErr?.path, {
            message: validatorErr.message,
          }),
        );
      } else {
        toast.error("Failed to submit expense");
      }

      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-bold">Add Expense</DialogTitle>
          <DialogDescription>
            Enter the expense details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
            <FieldGroup>
              {/* Amount */}
              <Field>
                <FieldLabel
                  htmlFor="amount"
                  className="text-base font-semibold"
                >
                  Amount
                </FieldLabel>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className={`pl-7 ${errors.amount ? "border-red-500" : ""}`}
                    {...register("amount", { valueAsNumber: true })}
                  />
                </div>
                {errors.amount && <FieldError errors={[errors.amount]} />}
              </Field>

              {/* Category */}
              <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-base font-semibold">
                      Category
                    </FieldLabel>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={errors.category ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {expensesCategory.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <FieldError errors={[errors.category]} />
                    )}
                  </Field>
                )}
              />

              {/* Project */}
              <Controller
                control={control}
                name="projectId"
                render={({ field }) => (
                  <Field>
                    <FieldLabel className="text-base font-semibold">
                      Project
                    </FieldLabel>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger
                        className={errors.projectId ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project: any) => (
                          <SelectItem key={project.id} value={project.id}>
                            {project.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.projectId && (
                      <FieldError errors={[errors.projectId]} />
                    )}
                  </Field>
                )}
              />

              {/* Description */}
              <Field>
                <FieldLabel className="text-base font-semibold">
                  Description (Optional)
                </FieldLabel>
                <Textarea
                  placeholder="Add details about this expense.."
                  className="min-h-[80px]"
                  {...register("description")}
                />
              </Field>

              {/* Receipt Upload */}
              <Field>
                <FieldLabel className="text-base font-semibold">
                  Receipt
                </FieldLabel>

                {!receiptFile ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                      className="hidden"
                    />
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Tap to upload receipt</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG or PDF (max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded">
                        <Upload className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-[200px]">
                          {receiptFile.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {(receiptFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={removeReceipt}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                {errors?.receiptDocImage && (
                  <FieldError errors={[errors.receiptDocImage]} />
                )}
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter className="px-6 py-4 border-t flex gap-2">
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                reset();
                setReceiptFile(null);
                onOpenChange(false);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {isCreateLoading ? (
                <>
                  <Spinner /> Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
