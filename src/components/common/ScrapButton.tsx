import Heart from '@/assets/icon/common/HeartIcon.svg?react';
import ActiveHeart from '@/assets/icon/common/HeartActive.svg?react';
import cn from '@/utils/cn';
import { usePostItemLike } from '@/services/likes/mutation/usePostItemLike';
import { usePatchItemLike } from '@/services/likes/mutation/usePatchItemLike';

export const ScrapButton = ({
  scrapped,
  handleClickSave,
  additionalStyles = '',
}: {
  scrapped: boolean;
  handleClickSave: () => void;
  additionalStyles?: string;
}) => {
  const handleClickScrapButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClickSave();
  };

  return (
    <>
      {scrapped ? (
        <ActiveHeart
          className={cn(
            'text-main z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
        />
      ) : (
        <Heart
          className={cn(
            'text-grey03 z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
        />
      )}
    </>
  );
};

export const ItemLikeButton = ({
  sellerId,
  itemId,
  liked,
  additionalStyles = '',
}: {
  sellerId: number;
  itemId: number;
  liked: boolean;
  additionalStyles?: string;
}) => {
  const { mutate: postLike } = usePostItemLike();
  const { mutate: patchLike } = usePatchItemLike();

  const handleClickScrapButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      patchLike({ sellerId, itemId });
    } else {
      postLike({ sellerId, itemId });
    }
  };

  return (
    <>
      {liked ? (
        <ActiveHeart
          className={cn(
            'text-main z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
          aria-label="좋아요 취소 버튼"
          role="button"
        />
      ) : (
        <Heart
          className={cn(
            'text-grey03 z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
          aria-label="좋아요 버튼"
          role="button"
        />
      )}
    </>
  );
};
