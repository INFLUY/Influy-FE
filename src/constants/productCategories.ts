import { CategoryType } from '@/types/common/CategoryType.types';

const PRODUCT_CATEGORIES: CategoryType[] = [
  { id: 0, category: '뷰티' },
  { id: 1, category: '패션' },
  { id: 2, category: '푸드' },
  { id: 3, category: '라이프' },
  { id: 4, category: '디지털' },
  { id: 5, category: '패션소품' },
  { id: 6, category: '주얼리' },
  { id: 7, category: '키즈' },
  { id: 8, category: '스포츠/레저' },
  { id: 9, category: '선물' },
  { id: 10, category: '명품' },
  { id: 11, category: '여행' },
  { id: 12, category: '기념일' },
  { id: 13, category: '기타' },
] as const;

export default PRODUCT_CATEGORIES;
