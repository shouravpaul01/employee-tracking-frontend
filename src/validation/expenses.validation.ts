import z from "zod";

export const rejectedFeedbackSchema = z.object({
  feedback: z.string().min(1, "Feedback is required"),
});