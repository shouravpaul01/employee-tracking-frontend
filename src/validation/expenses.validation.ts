import z from "zod";

export const rejectedFeedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});

export const createExpenseSchema = z.object({
  amount: z
    .number({error:"Amount is required."})
    .min(1, "Amount is required"),
    
  category: z.string().nonempty( "Category is required"),
  projectId: z.string().nonempty("Project is required"),
  description: z.string().optional(),
 
   receiptDocImage:z.any().optional(),
});