import { z } from "zod";

export const registerSchemaRaw = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "正しいメールアドレスを入力してください" }),
});

export type RegisterForm = z.input<typeof registerSchemaRaw>;
export type LoginForm = z.infer<typeof loginSchema>;
