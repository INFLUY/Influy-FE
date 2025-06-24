import { z } from 'zod/v4';

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
      .max(40, { message: '40자 이내로 작성해 주세요.' }),
    // 상품 카테고리
    selectedCategoryList: z
      .array(z.string())
      .max(3)
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
    startISODateTime: z.iso.datetime().nullable(),
    // 마감일
    endISODateTime: z.iso.datetime().nullable(),
    // 한 줄 소개
    summaryText: z.string().max(18, '18자 이내로 작성해 주세요.').nullable(),
    // 가격 정가
    price: z.coerce.number().gt(0).nullable(),
    // 가격 할인가
    salePrice: z.coerce.number().gt(0).nullable(),
    // 판매 링크
    linkText: z
      .union([z.literal(''), z.url()], {
        message: '올바른 양식으로 입력해 주세요.',
      })
      .optional(),
    //진행 회차
    period: z.number().nullable(),
    // 코멘트
    commentText: z.string().nullable(),
  })
  .refine((data) => {
    // hasStartDate === (startISODateTime !== null)
    return (data.startISODateTime !== null) === data.hasStartDate;
  });
