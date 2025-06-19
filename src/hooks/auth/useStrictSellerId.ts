import { useAuthStore } from '@/store/authStore';

export const useStrictSellerId = () => {
  const { sellerId } = useAuthStore();
  if (!sellerId) {
    throw new Error('셀러가 아닙니다. 셀러로 로그인해주세요.');
  }
  return sellerId;
};
