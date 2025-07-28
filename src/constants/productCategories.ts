import { CategoryType } from '@/types/common/CategoryType.types';

const PRODUCT_CATEGORIES: CategoryType[] = [
  { id: 0, name: '뷰티' },
  { id: 1, name: '패션' },
  { id: 2, name: '푸드' },
  { id: 3, name: '라이프' },
  { id: 4, name: '디지털' },
  { id: 5, name: '패션소품' },
  { id: 6, name: '주얼리' },
  { id: 7, name: '키즈' },
  { id: 8, name: '스포츠/레저' },
  { id: 9, name: '선물' },
  { id: 10, name: '명품' },
  { id: 11, name: '여행' },
  { id: 12, name: '기념일' },
  { id: 13, name: '기타' },
] as const;

export default PRODUCT_CATEGORIES;
