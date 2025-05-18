import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(1, "メッセージは必須です"),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
