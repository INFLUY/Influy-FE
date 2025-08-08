import { postItemLike } from '@/api/likes/handleItemLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePostItemLike = () => {
  const queryClient = useQueryClient();
  // const { accessToken } = useAuthStore();

  return useMutation({
    mutationFn: ({ sellerId, itemId }: { sellerId: number; itemId: number }) =>
      postItemLike({ sellerId, itemId }),
    // onMutate: async ({ itemId, sellerId }) => {
    //   if (!accessToken) {
    //     sessionStorage.setItem('lastPath', window.location.pathname);
    //     window.location.replace(PATH.LOGIN.BASE);
    //     return;
    //   }

    //   const previousCache: Record<string, any> = {};

    //   const keysToUpdate = [
    //     QUERY_KEYS.LIKED_ITEMS,
    //     QUERY_KEYS.HOME_CLOSE_DEADLINE,
    //     QUERY_KEYS.HOME_POPULAR,
    //     QUERY_KEYS.SEARCHED_ITEMS,
    //   ];

    //   keysToUpdate.forEach((queryKey) => {
    //     const queries = queryClient.getQueriesData({
    //       queryKey: [queryKey],
    //     });

    //     queries.forEach(([fullQueryKey, cached]) => {
    //       if (!cached) return;

    //       const isInfinite = Array.isArray((cached as any).pages);

    //       if (isInfinite) {
    //         const updatedPages = (cached as any).pages.map((page: any) => {
    //           if (page.itemLikeList) {
    //             const updatedItems = page.itemLikeList.map(
    //               (item: ItemCardType) =>
    //                 item.itemId === itemId
    //                   ? { ...item, liked: !item.liked }
    //                   : item
    //             );

    //             return {
    //               ...page,
    //               itemLikeList: updatedItems,
    //             };
    //           }
    //           if (page.itemPreviewList) {
    //             const updatedItems = page.itemPreviewList.map(
    //               (item: ItemCardType) =>
    //                 item.itemId === itemId
    //                   ? { ...item, liked: !item.liked }
    //                   : item
    //             );

    //             return {
    //               ...page,
    //               itemPreviewList: updatedItems,
    //             };
    //           }
    //           return page;
    //         });

    //         const updatedCache = {
    //           ...(cached as any),
    //           pages: updatedPages,
    //         };

    //         previousCache[JSON.stringify(fullQueryKey)] = cached;
    //         queryClient.setQueryData(fullQueryKey, updatedCache);
    //       }
    //       // 일반 배열 캐시 처리
    //       else if (Array.isArray(cached)) {
    //         const updated = (cached as ItemCardType[]).map((item) =>
    //           item.itemId === itemId ? { ...item, liked: !item.liked } : item
    //         );

    //         previousCache[JSON.stringify(fullQueryKey)] = cached;
    //         queryClient.setQueryData(fullQueryKey, updated);
    //       }
    //     });
    //   });

    //   // 카테고리 추천 캐시 처리
    //   const recommendQueries = queryClient.getQueriesData({
    //     queryKey: [QUERY_KEYS.HOME_RECOMMEND],
    //   });

    //   recommendQueries.forEach(([queryKey, cached]) => {
    //     if (!cached) return;

    //     const isInfinite = Array.isArray((cached as any).pages);

    //     if (isInfinite) {
    //       const updatedPages = (cached as any).pages.map((page: any) => {
    //         if (page.itemPreviewList) {
    //           const updatedItems = page.itemPreviewList.map(
    //             (item: ItemCardType) =>
    //               item.itemId === itemId
    //                 ? { ...item, liked: !item.liked }
    //                 : item
    //           );

    //           return {
    //             ...page,
    //             itemPreviewList: updatedItems,
    //           };
    //         }
    //         return page;
    //       });

    //       const updatedCache = {
    //         ...(cached as any),
    //         pages: updatedPages,
    //       };

    //       previousCache[JSON.stringify(queryKey)] = cached;
    //       queryClient.setQueryData(queryKey, updatedCache);
    //     }
    //   });

    //   // 셀러 홈 아이템 리스트 캐시
    //   const sellerMarketQueries = queryClient.getQueriesData({
    //     queryKey: [QUERY_KEYS.SELLER_MARKET_ITEMS],
    //   });

    //   sellerMarketQueries.forEach(([queryKey, cached]) => {
    //     if (
    //       Array.isArray(queryKey) &&
    //       typeof queryKey[1] === 'object' &&
    //       queryKey[1]?.sellerId === sellerId
    //     ) {
    //       const isInfinite = Array.isArray((cached as any).pages);

    //       if (isInfinite) {
    //         const updatedPages = (cached as any).pages.map((page: any) => {
    //           if (page.itemPreviewList) {
    //             const updatedItems = page.itemPreviewList.map(
    //               (item: ItemCardType) =>
    //                 item.itemId === itemId
    //                   ? { ...item, liked: !item.liked }
    //                   : item
    //             );

    //             return {
    //               ...page,
    //               itemPreviewList: updatedItems,
    //             };
    //           }
    //           return page;
    //         });

    //         const updatedCache = {
    //           ...(cached as any),
    //           pages: updatedPages,
    //         };

    //         previousCache[JSON.stringify(queryKey)] = cached;
    //         queryClient.setQueryData(queryKey, updatedCache);
    //       }
    //     }
    //   });

    //   return { previousCache };
    // },
    onSuccess: (_, _variables) => {
      const keysToInvalidate = [
        [QUERY_KEYS.LIKED_ITEMS],
        [QUERY_KEYS.HOME_CLOSE_DEADLINE],
        [QUERY_KEYS.HOME_POPULAR],
        [QUERY_KEYS.SEARCHED_ITEMS],
        [QUERY_KEYS.HOME_RECOMMEND],
      ];

      keysToInvalidate.forEach((key) => {
        queryClient.invalidateQueries({
          predicate: (query) => {
            return JSON.stringify(query.queryKey) === JSON.stringify(key);
          },
        });
      });

      // 상품 상세정보
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SELLER_MARKET_ITEM, _variables.itemId],
      });
      // 상품 좋아요
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ITEM_LIKE_COUNTS, _variables.itemId],
      });
    },
    // onError: (_error, _variables, context) => {
    //   if (!context?.previousCache) return;
    //   // 롤백 처리
    //   Object.entries(context.previousCache).forEach(([key, value]) => {
    //     const parsedKey = JSON.parse(key);
    //     queryClient.setQueryData(parsedKey, value);
    //   });
    // },
  });
};
