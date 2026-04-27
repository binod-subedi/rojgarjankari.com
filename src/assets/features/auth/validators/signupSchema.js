import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z.string().min(1, "Full name is required"),
    phone: z.string().regex(/^\d{10,}$/, "Phone must be valid"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Minimum 6 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
