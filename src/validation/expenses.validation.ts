import z from "zod";

export const rejectedFeedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});

export const createExpenseSchema = z.object({
  amount: z
    .number()
    .min(1, "Amount is required"),
    
  category: z.string().nonempty( "Category is required"),
  project: z.string().nonempty("Project is required"),
  description: z.string().optional(),
  receipt: z.any().optional(),
});