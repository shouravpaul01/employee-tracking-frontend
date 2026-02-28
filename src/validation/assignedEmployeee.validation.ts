import z from "zod";

export const assignEmployeeSchema = z.object({
  employeeId: z.string().nonempty("Employee is required"),
  projectId: z.string().nonempty("Project is required"),
  role: z.string().nonempty( "Role is required"),
});
