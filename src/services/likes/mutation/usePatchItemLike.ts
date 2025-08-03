import { patchItemLike } from '@/api/likes/handleItemLikes.api';
import { QUERY_KEYS } from '@/constants/api';
import { ItemCardType } from '@/types/common/ItemType.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usePatchItemLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sellerId, itemId }: { sellerId: number; itemId: number }) =>
      patchItemLike({ sellerId, itemId }),
    onMutate: async ({ itemId }) => {
      const keysToUpdate = [
        QUERY_KEYS.LIKED_ITEMS,
        QUERY_KEYS.HOME_CLOSE_DEADLINE,
        QUERY_KEYS.HOME_POPULAR,
      ];
      // TODO: 셀러 홈 아이템 리스트 캐시 갱신

      const previousCache: Record<string, any> = {};

      keysToUpdate.forEach((key) => {
        const cached = queryClient.getQueryData<any>([key]);

        if (!cached) return;

        const isInfinite = Array.isArray(cached.pages);

        if (isInfinite) {
          const updatedPages = cached.pages.map((page: any) => {
            if (page.itemLikeList) {
              const updatedItems = page.itemLikeList.map(
                (item: ItemCardType) =>
                  item.itemId === itemId
                    ? { ...item, liked: !item.liked }
                    : item
              );

              return {
                ...page,
                itemLikeList: updatedItems,
              };
            }
            if (page.itemPreviewList) {
              const updatedItems = page.itemPreviewList.map(
                (item: ItemCardType) =>
                  item.itemId === itemId
                    ? { ...item, liked: !item.liked }
                    : item
              );

              return {
                ...page,
                itemPreviewList: updatedItems,
              };
            }
            return page;
          });

          const updatedCache = {
            ...cached,
            pages: updatedPages,
          };

          previousCache[key] = cached; // 롤백용 저장
          queryClient.setQueryData([key], updatedCache);
        }

        // 일반 배열 캐시 처리
        else if (Array.isArray(cached)) {
          const updated = cached.map((item) =>
            item.itemId === itemId ? { ...item, liked: !item.liked } : item
          );

          previousCache[key] = cached;
          queryClient.setQueryData([key], updated);
        }
      });

      // 카테고리 추천 캐시 처리
      const recommendQueries = queryClient.getQueriesData({
        queryKey: [QUERY_KEYS.HOME_RECOMMEND],
      });

      recommendQueries.forEach(([queryKey, cached]) => {
        if (!cached) return;

        const isInfinite = Array.isArray((cached as any).pages);

        if (isInfinite) {
          const updatedPages = (cached as any).pages.map((page: any) => {
            if (page.itemPreviewList) {
              const updatedItems = page.itemPreviewList.map(
                (item: ItemCardType) =>
                  item.itemId === itemId
                    ? { ...item, liked: !item.liked }
                    : item
              );

              return {
                ...page,
                itemPreviewList: updatedItems,
              };
            }
            return page;
          });

          const updatedCache = {
            ...(cached as any),
            pages: updatedPages,
          };

          previousCache[JSON.stringify(queryKey)] = cached;
          queryClient.setQueryData(queryKey, updatedCache);
        }
      });

      return { previousCache }; // 롤백용
    },
    onError: (_error, _variables, context) => {
      if (!context?.previousCache) return;
      // 롤백 처리
      Object.entries(context.previousCache).forEach(([key, value]) => {
        const parsedKey = JSON.parse(key);
        queryClient.setQueryData(parsedKey, value);
      });
    },
  });
};
