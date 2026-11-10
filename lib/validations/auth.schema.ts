import * as z from "zod";

const email = z
  .email("Please enter a valid email address")
  .trim()
  .toLowerCase();

export const signupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 charecters")
    .max(50, "Name cannot be more than 50 charecter"),
  email,
  password: z
    .string()
    .min(8, "Password must be at least 8 charecters")
    .max(72, "Password is too long")
    .regex(/[a-z]/, "Password must contain a lowercase letter")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number")
    .regex(/[^A-Za-z0-9]/, "Password must contain a special character"),
});

export const loginSchema = z.object({
  email,
  password: z.string().min(1, "Password is required"),
});
