import { z } from "zod";

export const createGuildSchemaRaw = z.object({
 name:z.string().min(1,'ギルド名を入力してください').max(15,'名前が長すぎます'),
 description:z.string().min(1,'紹介文を入力してください')
});



export type CreateGuildForm = z.input<typeof createGuildSchemaRaw>;

