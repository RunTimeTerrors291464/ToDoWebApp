import { z } from "zod";

export const authSchema = z.object({
  username: z.string().min(3, "Tối thiểu 3 ký tự"),
  password: z.string().min(6, "Tối thiểu 6 ký tự"),
});

export const taskSchema = z.object({
  // title: z.string().min(1, "Không để trống"),
  // description: z.string().optional(),
  // priority: z.coerce.number().min(0).max(4),
  // status: z.coerce.number().min(0).max(3),
  // 
  // title: z.string().min(1, "Không để trống"),
  // description: z.string().optional(),
  // priority: z
  //   .string()
  //   .transform((val) => Number(val))
  //   .refine((val) => [0, 1, 2, 3, 4].includes(val), "Invalid priority"),
  // status: z
  //   .string()
  //   .transform((val) => Number(val))
  //   .refine((val) => [0, 1, 2, 3].includes(val), "Invalid status"),
  // 
  title: z.string(),
  description: z.string().optional(),
  priority: z.number(),
  status: z.number(),
});

export type AuthInput = z.infer<typeof authSchema>;
export type TaskInput = z.infer<typeof taskSchema>;
