import { z } from "zod";

// Define the Zod schemas
export const signUpInput = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional()
});

export type signUpInput = z.infer<typeof signUpInput>;

export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export type signInInput = z.infer<typeof signInInput>;  // Fixed the typo here

export const createBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional()
});

export type createBlogInput = z.infer<typeof createBlogInput>;  // Fixed the typo here

export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string(),
    content: z.string(),
    published: z.boolean().optional()
});

export type updateBlogInput = z.infer<typeof updateBlogInput>;
