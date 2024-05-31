// import { isValidPhoneNumber } from "react-phone-number-input"
import { z } from "zod"

export const RegisterSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters long"),
  lastName: z.string().min(2, "Name must be at least 2 characters long"),
  gender: z.string().min(1, "Gender is required"),
  healthCondition: z.string().min(1, "Required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
})

export type RegisterType = z.infer<typeof RegisterSchema>
