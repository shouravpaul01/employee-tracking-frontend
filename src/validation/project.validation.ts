import z from "zod";

export const createProjectSchema = z.object({
  name: z.string().trim().nonempty("Name is required"),
  propertyAddress: z.string().trim().nonempty("Property address is required"),
  clientName: z.string().trim().nonempty( "Client name is required"),
  status: z.string().trim().nonempty("Status is required"),
  accessInfo: z.string().optional(),
  notes: z.string().optional(),
})