import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3, "Tối thiểu 3 ký tự"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});

export const taskSchema = z.object({
  title: z.string().min(1, "Không để trống"),
  description: z.string().optional(),
  priority: z.coerce.number().min(0).max(4),
  status: z.coerce.number().min(0).max(3),
});

export type AuthInput = z.infer<typeof authSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
