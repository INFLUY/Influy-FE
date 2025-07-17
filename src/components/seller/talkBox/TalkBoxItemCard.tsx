import { TalkBoxItem } from '@/types/seller/TalkBox.types';
import { QuestionCountBadge } from '@/components';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

export const TalkBoxItemCard = ({ item }: { item: TalkBoxItem }) => {
  const navigate = useNavigate();

  return (
    <article
      className="flex h-[5.25rem] w-full cursor-pointer gap-[.6875rem]"
      onClick={() =>
        navigate(
          `${PATH.SELLER.base}/${PATH.SELLER.talkBox.base}/${PATH.SELLER.talkBox.item.base.replace(':itemId', String(item.id))}`
        )
      }
    >
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-full">
        {item.thumbnailUrl && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={item.thumbnailUrl}
            alt={item.title + ' 썸네일'}
          />
        )}
      </div>
      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col justify-between">
        <p className="body2-m line-clamp-2 text-black">{item.title}</p>
        <div className="flex w-full justify-between">
          <div
            className="caption-m flex items-center gap-1"
            aria-label={`응답 대기 ${item.pendingCount}개, 응답 완료 ${item.answeredCount}개`}
          >
            <span className="text-grey11">
              응답대기 : {item.pendingCount}개
            </span>
            <div className="bg-grey06 h-3 w-[1.2px]" aria-hidden />
            <span className="text-grey07">
              응답완료 : {item.pendingCount}개
            </span>
          </div>
          <QuestionCountBadge count={item.pendingCount} />
        </div>
      </div>
    </article>
  );
};

export const TalkBoxBottomItemCard = ({
  onCardClick,
  title,
  tagline,
  imgUrl,
}: {
  onCardClick: () => void;
  title: string;
  tagline: string | null;
  imgUrl: string | null;
}) => {
  return (
    <button
      onClick={onCardClick}
      aria-label={`${title} 상세로 이동`}
      className="border-t-grey03 fixed bottom-0 z-1 flex h-fit w-full max-w-[40rem] min-w-[20rem] cursor-pointer items-center gap-[.5625rem] self-stretch border-t border-solid bg-white px-5 py-2 md:w-[28rem]"
    >
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-[3.125rem]">
        {imgUrl && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={imgUrl}
            alt={title + ' 사진'}
          />
        )}
      </div>
      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col gap-0.5 text-left text-black">
        <p className="body2-b line-clamp-1">{title}</p>
        {tagline && <p className="body1-m line-clamp-1">{tagline}</p>}
      </div>
      <ArrowRightIcon className="text-grey07 h-4 w-4" />
    </button>
  );
};

// 카테고리별 질문 페이지 상단에 있는 아이템 카드
export const TalkBoxQuestionItemCard = ({
  title,
  tagline,
  imgUrl,
}: {
  title: string;
  tagline: string | null;
  imgUrl: string | null;
}) => {
  return (
    <div className="border-grey03 flex h-[4.1875rem] w-full items-center gap-[1.0625rem] rounded-xs border border-solid bg-white">
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-full">
        {imgUrl && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={imgUrl}
            alt={title + ' 사진'}
          />
        )}
      </div>
      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col items-start justify-center text-left">
        <p className="body2-b line-clamp-1 text-black">{title}</p>
        {tagline && (
          <p className="body2-m text-grey09 line-clamp-1">{tagline}</p>
        )}
      </div>
    </div>
  );
};
