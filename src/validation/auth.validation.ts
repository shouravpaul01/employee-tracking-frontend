import z from "zod";

export const loginSchema = z.object({
  email: z.string().nonempty( "Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
  userType: z.string(),
});
