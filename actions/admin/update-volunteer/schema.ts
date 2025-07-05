import { z } from "zod";

export const UpdateVolunteerSchema = z.object({
  firstName: z
    .string({
      required_error: "Firstname is required",
      invalid_type_error: "Firstname is required",
    })
    .min(3, {
      message: "Firstname is too short",
    }),
  lastName: z
    .string({
      required_error: "Lastname is required",
      invalid_type_error: "Lastname is required",
    })
    .min(2, {
      message: "Lastname is too short",
    }),
  phone: z
    .string({
      invalid_type_error: "Phone number is required",
      required_error: "Phone number is required",
    })
    .min(9, {
      message: "Phone number must be at least 9 digits",
    }),
  instagram: z.string().optional(),
  birthDate: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), {
    message: "Invalid date",
  }),
});
