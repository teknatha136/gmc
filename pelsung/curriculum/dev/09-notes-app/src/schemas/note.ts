import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be under 100 characters"),
  body: z
    .string()
    .min(10, "Body is too short — write at least 10 characters"),
});

export type NoteInput = z.infer<typeof noteSchema>;

export type Note = NoteInput & {
  id: number;
  userId?: number;
};
