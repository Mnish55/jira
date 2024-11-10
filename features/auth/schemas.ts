import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
})

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
})