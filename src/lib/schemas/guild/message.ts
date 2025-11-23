import { z } from "zod";

export const createMessageSchemaRaw = z.object({
  content: z.string().min(1, "1文字以上入力してください"),
});

export type CreateMessagedForm = z.input<typeof createMessageSchemaRaw>;
