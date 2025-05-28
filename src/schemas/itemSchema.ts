import { z } from 'zod/v4';

export const itemSchema = z.object({
  // 제목
  titleText: z
    .string()
    .min(1, '상품의 이름을 입력해 주세요.')
    .max(40, '45자 이내로 작성해 주세요.'),
  // 상품 카테고리
  selectedCategoryList: z.array(z.string()).max(3, '최대 3개 선택 가능'),
  //시작일 offset 추가..?
  startISODateTime: z.iso.datetime().nullable(),
  // 마감일
  endISODateTime: z.iso.datetime().nullable(),
  // 한 줄 소개
  summaryText: z.string().max(18, '18자 이내로 작성해 주세요.'),
  // 가격 정가
  price: z.coerce.number().gt(0),
  // 가격 할인가
  salePrice: z.coerce.number().gt(0),
  // 판매 링크
  linkText: z.url('유효한 링크를 입력해주세요').nullable(),
  //진행 회차
  period: z.number().nullable(),
  // 코멘트
  commentText: z.string().nullable(),
});
