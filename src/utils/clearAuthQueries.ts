import { QueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/api';

export const clearAuthQueries = (queryClient: QueryClient) => {
  const keysToRemove = [
    QUERY_KEYS.SELLER_MY_PROFILE,
    QUERY_KEYS.SELLER_MY_MARKET,
    QUERY_KEYS.SELLER_MY_HOME_QUESTIONS,
    QUERY_KEYS.USER_PROFILE,
  ];
  // TODO: 유저 정보와 관련된 쿼리키들 추가

  keysToRemove.forEach((key) => {
    queryClient.removeQueries({ queryKey: [key] });
  });
};
