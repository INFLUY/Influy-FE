import { z } from 'zod/v4';

export const sellerProfileSchema = z.object({
  // 백그라운드 사진
  backgroundImg: z.string().nullable(),
  // 프로필 사진
  profileImg: z.string().nullable(),
  //닉네임
  nickname: z.string().min(1, { message: '닉네임을 입력해 주세요.' }).max(8, {
    message: '닉네임은 8자 이내로 작성해 주세요.',
  }),
  // 자기소개
  instagram: z
    .url()
    .nullable()
    .refine((val) => !val || val.startsWith('https://instagram.com/'), {
      message: '인스타그램 주소를 올바르게 입력해 주세요.',
    }),
  youtube: z
    .url()
    .nullable()
    .refine((val) => !val || val.startsWith('https://www.youtube.com/'), {
      message: '유튜브 주소를 올바르게 입력해 주세요.',
    }),
  tiktok: z
    .url()
    .nullable()
    .refine((val) => !val || val.startsWith('https://www.tiktok.com/@'), {
      message: '틱톡 주소를 올바르게 입력해 주세요.',
    }),
  email: z.email().min(1, { message: '이메일을 입력해 주세요.' }),
});
