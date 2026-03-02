import z from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  role: z.string(),
});

export const registerSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
});
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("The field is required."),
    newPassword: z.string().nonempty("The field is required."),
    confirmPassword: z.string().min(8, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });