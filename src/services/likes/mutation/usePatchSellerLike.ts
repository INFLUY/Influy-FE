import { patchSellerLike } from '@/api/likes/handleSellerLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchSellerLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sellerId }: { sellerId: number }) =>
      patchSellerLike({ sellerId }),
    // onMutate: async ({ sellerId }) => {
    //   const keysToUpdate = [
    //     [QUERY_KEYS.LIKED_SELLERS],
    //     [QUERY_KEYS.SELLER_MARKET_LIKES, { sellerId }],
    //   ];

    //   const previousCache: Record<string, any> = {};

    //   keysToUpdate.forEach((queryKey) => {
    //     const cached = queryClient.getQueryData<any>(queryKey);

    //     if (!cached) return;

    //     const isInfinite = Array.isArray(cached.pages);

    //     if (isInfinite) {
    //       const updatedPages = cached.pages.map((page: any) => {
    //         if (page.sellerLikeList) {
    //           const updatedSellers = page.sellerLikeList.map(
    //             (seller: SellerLikeList) =>
    //               seller.sellerId === sellerId
    //                 ? {
    //                     ...seller,
    //                     liked: !seller.liked,
    //                     likeCnt: seller.likeCnt + 1,
    //                   }
    //                 : seller
    //           );

    //           return {
    //             ...page,
    //             sellerLikeList: updatedSellers,
    //           };
    //         }
    //         return page;
    //       });

    //       const updatedCache = {
    //         ...cached,
    //         pages: updatedPages,
    //       };

    //       previousCache[JSON.stringify(queryKey)] = cached;
    //       queryClient.setQueryData(queryKey, updatedCache);
    //     } else if (Array.isArray(cached)) {
    //       const updated = cached.map((market) =>
    //         market.sellerId === sellerId
    //           ? { ...market, liked: !market.liked, likeCnt: market.likeCnt + 1 }
    //           : market
    //       );

    //       previousCache[JSON.stringify(queryKey)] = cached;
    //       queryClient.setQueryData(queryKey, updated);
    //     } else if (
    //       cached &&
    //       typeof cached === 'object' &&
    //       'targetId' in cached
    //     ) {
    //       console.log(cached);

    //       // 단일 객체 처리
    //       if (cached.targetId === sellerId) {
    //         const updated = {
    //           ...cached,
    //           liked: !cached.liked,
    //           likeCnt: cached.likeCnt + (cached.liked ? -1 : 1),
    //         };

    //         previousCache[JSON.stringify(queryKey)] = cached;
    //         queryClient.setQueryData(queryKey, updated);
    //       }
    //     }
    //   });

    //   return { previousCache }; // 롤백용
    // },
    onSuccess: (_, _variables) => {
      const keysToInvalidate = [
        [QUERY_KEYS.LIKED_SELLERS],
        [QUERY_KEYS.SELLER_MARKET_LIKES],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            return JSON.stringify(query.queryKey) === JSON.stringify(key);
          },
        });
      });
    },
    // onError: (_error, _variables, context) => {
    //   if (!context?.previousCache) return;
    //   // 롤백 처리
    //   Object.entries(context.previousCache).forEach(([key, value]) => {
    //     queryClient.setQueryData([key], value);
    //   });
    // },
  });
};
