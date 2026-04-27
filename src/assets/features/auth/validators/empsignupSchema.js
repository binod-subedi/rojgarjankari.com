import { z } from "zod";

export const empsignupSchema = z
  .object({
    fullName: z.string().min(1, "Name is required"),
    companyName: z.string().min(1, "Company Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(8, "Minimum 8 Characters"),
    confirmPassword: z.string().min(8, "Minimum 8 Characters"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });
