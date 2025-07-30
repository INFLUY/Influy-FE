import { z } from 'zod/v4';

export const sellerProfileSchema = z.object({
  // 백그라운드 사진
  backgroundImg: z.string().optional(),
  // 프로필 사진
  profileImg: z.string().optional(),
  //닉네임
  nickname: z.string().min(1, { message: '닉네임을 입력해 주세요.' }).max(8, {
    message: '8자 이내로 작성해 주세요.',
  }),
  // 자기소개
  instagram: z
    .url()
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
    .union([z.url(), z.literal('')])
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
    .union([z.url(), z.literal('')])
    .refine(
      (val) =>
        !val ||
        val.startsWith('https://www.tiktok.com/@') ||
        val.startsWith('https://tiktok.com/@'),
      {
        message: '틱톡 주소를 올바르게 입력해 주세요.',
      }
    ),
  email: z.union([z.email(), z.literal('')]),
});
