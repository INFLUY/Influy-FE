import { z } from 'zod/v4';

export const marketLinkSchema = z.object({
  // 링크 이름
  linkName: z.string().min(1, { message: '링크 이름을 입력해 주세요.' }),
  // URL
  link: z
    .string()
    .min(1, { message: 'URL을 입력해 주세요.' })
    .refine((val) => !val || val.startsWith('https://'), {
      message: '올바른 양식으로 입력해 주세요.',
    }),
  // 링크 ID
  linkId: z.number().optional(),
});

export type MarketLinkFormValues = z.infer<typeof marketLinkSchema>;
