"use client";

import * as React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { expensesCategory } from "@/constant";
import { createExpenseSchema } from "@/validation/expenses.validation";







const projects = [
  "Del Mar Coastal Villa",
  "Downtown Office Renovation",
  "Beachfront Property",
  "Hillside Residence",
  "Commercial Space Staging",
];

export function CreateExpenseFormDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const [receiptFile, setReceiptFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(createExpenseSchema),
    defaultValues: {
      amount: 0,
      category: "",
      project: "",
      description: "",
    },
  });

  const selectedCategory = watch("category");
  const selectedProject = watch("project");

  function onSubmit(data: FieldValues) {
    toast.success("Expense submitted!", {
      description: `$${data.amount} expense has been recorded.`,
    });

    console.log("Expense data:", data);
    console.log("Receipt:", receiptFile);

    onOpenChange(false);
    reset();
    setReceiptFile(null);
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceiptFile(file);
    }
  };

  const removeReceipt = () => {
    setReceiptFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0">
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
                    {...register("amount")}
                  />
                </div>
                {errors.amount && <FieldError errors={[errors.amount]} />}
              </Field>

              {/* Category */}
              <Field>
                <FieldLabel
                  htmlFor="category"
                  className="text-base font-semibold"
                >
                  Category
                </FieldLabel>
                <Select
                  onValueChange={(value) => setValue("category", value)}
                  value={selectedCategory}
                >
                  <SelectTrigger
                    className={errors.category ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expensesCategory.map((category) => (
                      <SelectItem key={category.label} value={category.label}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && <FieldError errors={[errors.category]} />}
              </Field>

              {/* Project */}
              <Field>
                <FieldLabel
                  htmlFor="project"
                  className="text-base font-semibold"
                >
                  Project
                </FieldLabel>
                <Select
                  onValueChange={(value) => setValue("project", value)}
                  value={selectedProject}
                >
                  <SelectTrigger
                    className={errors.project ? "border-red-500" : ""}
                  >
                    <SelectValue placeholder="Select Project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project} value={project}>
                        {project}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.project && <FieldError errors={[errors.project]} />}
              </Field>

              {/* Description */}
              <Field>
                <FieldLabel
                  htmlFor="description"
                  className="text-base font-semibold"
                >
                  Description (Optional)
                </FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Add details about this expenses.."
                  className="min-h-[80px]"
                  {...register("description")}
                />
              </Field>

              {/* Receipt Upload */}
              <Field>
                <FieldLabel
                  htmlFor="receipt"
                  className="text-base font-semibold"
                >
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
              </Field>
            </FieldGroup>
          </div>
          <DialogFooter className="px-6 py-4 border-t flex gap-2 ">
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
              Submit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
