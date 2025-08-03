import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';
import { DefaultButton } from '@/components/seller/common/Button';

export const UserNav = ({
  isTalkBoxOpened,
  likeCount,
  onLikeClick,
  onTalkBoxClick,
  onBuyClick,
}: {
  isTalkBoxOpened: boolean;
  likeCount: number;
  onLikeClick: () => void;
  onTalkBoxClick: () => void;
  onBuyClick: () => void;
}) => {
  return (
    <nav
      className="border-t-grey03 bg-grey01 bottom-bar flex items-start gap-3 border-t border-solid px-5 py-2"
      aria-label="하단 네비게이션 바"
      role="navigation"
    >
      {/* 좋아요 추가 */}
      <div className="flex flex-col gap-0.5">
        <span className="body2-m text-grey08">{likeCount}</span>
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
      <DefaultButton text="구매하기" onClick={onBuyClick} />
    </nav>
  );
};
