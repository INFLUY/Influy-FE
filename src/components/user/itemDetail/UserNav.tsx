import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';
import { DefaultButton, ItemLikeButton } from '@/components';
import { useSnackbarStore } from '@/store/snackbarStore';
import { Suspense } from 'react';

export const UserNav = ({
  isTalkBoxOpened,
  likeCount,
  onTalkBoxClick,
  marketLink,
  sellerId,
  itemId,
  liked,
}: {
  isTalkBoxOpened: boolean;
  likeCount: number;
  onTalkBoxClick: () => void;
  marketLink?: string | null;
  sellerId: number;
  itemId: number;
  liked: boolean;
}) => {
  const { showSnackbar } = useSnackbarStore();
  const handlePurchaseOnclick = () => {
    if (!marketLink) {
      showSnackbar('아직 판매 링크가 등록되지 않았습니다.');
      return;
    } else {
      window.open(marketLink, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <nav
      className="border-t-grey03 bg-grey01 bottom-bar flex items-start gap-3 border-t border-solid px-5 py-2"
      aria-label="하단 네비게이션 바"
      role="navigation"
    >
      {/* 좋아요 */}
      <div className="flex flex-col items-center justify-baseline gap-0.5">
        <Suspense>
          <ItemLikeButton sellerId={sellerId} itemId={itemId} liked={liked} />
          <span className="body2-m text-grey08">{likeCount}</span>
        </Suspense>
      </div>
      {isTalkBoxOpened && (
        <button
          type="button"
          onClick={onTalkBoxClick}
          className="border-grey04 flex aspect-[1/1] h-[3.0625rem] w-[3.0625rem] shrink-0 cursor-pointer items-center justify-center rounded-xs border bg-white"
        >
          <TalkBoxIcon />
        </button>
      )}
      <DefaultButton text="구매하기" onClick={handlePurchaseOnclick} />
    </nav>
  );
};
