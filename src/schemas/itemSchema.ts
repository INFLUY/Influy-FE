import { z } from 'zod/v4';

export const CATEGORY_MAX_COUNT = 3; // 카테고리 최대 선택 개수

export const itemSchema = z
  .object({
    // 이미지
    images: z
      .array(z.string())
      .min(1, { message: '사진을 1장 이상 등록해 주세요.' })
      .max(10),
    // 제목
    titleText: z
      .string()
      .min(1, { message: '제목을 입력해 주세요.' })
      .max(40, { message: '제목은 40자 이내로 작성해 주세요.' }),
    // 상품 카테고리
    selectedCategoryList: z
      .array(z.number())
      .max(CATEGORY_MAX_COUNT)
      .min(1, { message: '카테고리를 1개 이상 선택해 주세요.' }),
    //시작일 여부
    hasStartDate: z.boolean().refine((val) => val === true, {
      // false면 메시지를 반환
      message: '시작일을 선택해 주세요.',
    }),
    //마감일 여부
    hasEndDate: z.boolean().refine((val) => val === true, {
      // false면 메시지를 반환
      message: '마감일을 선택해 주세요.',
    }),
    //시작일
    startISODateTime: z.string().nullable().optional(),
    // 마감일
    endISODateTime: z.string().nullable().optional(),
    // 한 줄 소개
    summaryText: z
      .string()
      .min(1, { message: '한 줄 소개를 입력해 주세요.' })
      .max(18, '한 줄 소개를 18자 이내로 작성해 주세요'),
    // 가격 정가
    price: z.union([z.coerce.number().nullable().optional(), z.nan()]),
    // 가격 할인가
    salePrice: z.union([z.coerce.number().nullable().optional(), z.nan()]),
    // 판매 링크
    linkText: z
      .union([z.literal(''), z.url()], {
        message: '판매링크를 올바르게 입력해 주세요.',
      })
      .nullable(),
    //진행 회차
    period: z.number().nullable(),
    // 코멘트
    commentText: z.string().nullable().optional(),
  })
  .refine((val) => !(val.salePrice && !val.price), {
    path: ['price'],
    message: '정가를 입력해주세요.',
  })
  .refine(
    ({ salePrice, price }) =>
      salePrice == null || // 할인가가 없으면 검사 건너뛰기
      price == null || // 정가가 없으면 검사 건너뛰기
      salePrice <= price, // 둘 다 있으면 할인가 ≤ 정가 이어야 통과
    {
      path: ['salePrice'],
      message: '할인가가 정가보다 높습니다.',
    }
  );

// zod.pick으로 필요한 필드만 따로 검증
export const requiredFieldsSchema = itemSchema.pick({
  images: true,
  titleText: true,
  selectedCategoryList: true,
  hasStartDate: true,
  hasEndDate: true,
  summaryText: true,
});

export const requiredTitleSchema = itemSchema.pick({
  titleText: true,
});
