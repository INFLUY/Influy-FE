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
    .string()
    .min(1, { message: '인스타그램 URL을 입력해 주세요.' })
    .refine(
      (val) =>
        !val ||
        val.startsWith('https://www.instagram.com/') ||
        val.startsWith('https://instagram.com/'),
      {
        message: '인스타그램 주소를 올바르게 입력해 주세요.',
      }
    ),
  youtube: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.startsWith('https://www.youtube.com/') ||
        val.startsWith('https://youtube.com/'),
      {
        message: '유튜브 주소를 올바르게 입력해 주세요.',
      }
    ),
  tiktok: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        val.startsWith('https://www.tiktok.com/@') ||
        val.startsWith('https://tiktok.com/@'),
      {
        message: '틱톡 주소를 올바르게 입력해 주세요.',
      }
    ),
});

export const emailSchema = z
  .string()
  .min(1, { message: '이메일을 입력해 주세요.' })
  .email({ message: '올바른 양식으로 입력해주세요.' });
