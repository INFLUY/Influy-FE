import { z } from 'zod/v4';

export const idSchema = z
  .string()
  .min(3, { message: '아이디는 최소 3자, 최대 30자까지 입력할 수 있습니다.' })
  .max(30, {
    message: '아이디는 최소 3자, 최대 30자까지 입력할 수 있습니다.',
  })
  .regex(/^[a-z0-9_.]+$/, {
    message:
      '아이디는 영어 소문자, 숫자, 바(_), 마침표(.)만 사용할 수 있습니다.',
  });

export const snsSchema = z.object({
  instagram: z
    .union([z.url(), z.literal('')])
    .refine((val) => !val || val.startsWith('https://instagram.com/'), {
      message: '인스타그램 주소를 올바르게 입력해 주세요.',
    }),
  youtube: z
    .union([z.url(), z.literal('')])
    .refine((val) => !val || val.startsWith('https://www.youtube.com/'), {
      message: '유튜브 주소를 올바르게 입력해 주세요.',
    }),
  tiktok: z
    .union([z.url(), z.literal('')])
    .refine((val) => !val || val.startsWith('https://www.tiktok.com/@'), {
      message: '틱톡 주소를 올바르게 입력해 주세요.',
    }),
});

export const emailSchema = z
  .email()
  .min(1, { message: '이메일을 입력해 주세요.' });
