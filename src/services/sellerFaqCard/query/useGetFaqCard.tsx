import { getFaqCardDetail } from '@/api/faqCard/handleFaqCard.api';
import { QUERY_KEYS } from '@/constants/api';
import { FaqCardDetailReponse } from '@/types/common/FaqCardType.types';
import {
  useSuspenseQuery,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

export const useGetFaqCard = ({
  sellerId,
  itemId,
  faqCardId,
}: {
  sellerId: number;
  itemId: number;
  faqCardId: number;
}): UseSuspenseQueryResult<FaqCardDetailReponse> => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEYS.SELLER_FAQ_CARD, itemId, sellerId],
    queryFn: () => getFaqCardDetail({ sellerId, itemId, faqCardId }),
  });
};
