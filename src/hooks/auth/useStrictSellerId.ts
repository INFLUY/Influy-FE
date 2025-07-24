import { PATH } from '@/routes/path';
import { useAuthStore } from '@/store/authStore';
import { UIError } from '@/libs/error/UIError';

export const useStrictSellerId = () => {
  const { sellerId } = useAuthStore();
  if (sellerId === null) {
    throw new UIError(
      '셀러가 아닙니다.\n셀러로 로그인해주세요.',
      '홈으로',
      () => () => window.location.replace(PATH.HOME.BASE)
    );
  }
  return sellerId;
};
