import { z } from 'zod/v4';

export const itemSchema = z.object({
  // 이미지
  images: z
    .array(z.string('올바른 이미지 URL을 입력해 주세요.'))
    .max(10, '이미지는 최대 10개까지 업로드 가능합니다.'),
  // 제목
  titleText: z
    .string()
    .min(1, '상품의 이름을 입력해 주세요.')
    .max(40, '40자 이내로 작성해 주세요.'),
  // 상품 카테고리
  selectedCategoryList: z
    .array(z.string())
    .max(3)
    .min(1, '하나 이상 선택해주세요'),
  //시작일 여부
  hasStartDate: z.boolean('시작일을 선택해주세요.'),
  //마감일 여부
  hasEndDate: z.boolean(),
  //시작일
  startISODateTime: z.iso.datetime().nullable(),
  // 마감일
  endISODateTime: z.iso.datetime().nullable(),
  // 한 줄 소개
  summaryText: z.string().max(18, '18자 이내로 작성해 주세요.').nullable(),
  // 가격 정가
  price: z.coerce.number().gt(0),
  // 가격 할인가
  salePrice: z.coerce.number().gt(0),
  // 판매 링크
  linkText: z.url('올바른 양식으로 입력해 주세요.').nullable(),
  //진행 회차
  period: z.number().nullable(),
  // 코멘트
  commentText: z.string().nullable(),
});
