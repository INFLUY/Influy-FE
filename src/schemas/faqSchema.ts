import { z } from 'zod/v4';

export const faqSchema = z.object({
  // 카테고리
  category: z.number({ message: 'FAQ 카테고리를 선택해 주세요.' }),
  // 질문
  question: z
    .string()
    .min(1, { message: '질문을 입력해 주세요.' })
    .max(150, { message: '질문을 150자 아내로 작성해 주세요.' }),
  // 답변
  answer: z.string().min(1, { message: '답변을 입력해 주세요.' }),
  // 사진
  image: z.string().optional(),
  isPinned: z.boolean(),
  adjustImg: z.boolean(),
});

export type FaqFormValues = z.infer<typeof faqSchema>;
