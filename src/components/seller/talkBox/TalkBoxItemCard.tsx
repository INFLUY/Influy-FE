import { QuestionCountBadge, ItemClosedBanner } from '@/components';
import { TalkBoxOpenedItem } from '@/types/common/ItemType.types';
import { PATH } from '@/routes/path';
import { SELLER_ITEM_DETAIL } from '@/utils/generatePath';
import { useNavigate, generatePath } from 'react-router-dom';
import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';

export const TalkBoxItemCard = ({ item }: { item: TalkBoxOpenedItem }) => {
  const navigate = useNavigate();
  console.log(item.talkBoxCntInfo.waitingCnt);
  return (
    <article
      className="flex h-[5.25rem] w-full cursor-pointer gap-[.6875rem]"
      onClick={() =>
        navigate(
          `../${PATH.SELLER.TALK_BOX.ITEM.BASE.replace(':itemId', String(item.itemId))}`
        )
      }
    >
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-full">
        {item.itemMainImg && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={item.itemMainImg}
            alt={item.itemName + ' 썸네일'}
          />
        )}
      </div>

      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col justify-between">
        <p className="body2-m line-clamp-2 text-black">{item.itemName}</p>
        <div className="flex w-full justify-between">
          <div
            className="caption-m flex items-center gap-1"
            aria-label={`응답 대기 ${item.talkBoxCntInfo.waitingCnt}개, 응답 완료 ${item.talkBoxCntInfo.completedCnt}개`}
          >
            <span className="text-grey11">
              응답대기 : {item.talkBoxCntInfo.waitingCnt}개
            </span>
            <div className="bg-grey06 h-3 w-[1.2px]" aria-hidden />
            <span className="text-grey07">
              응답완료 : {item.talkBoxCntInfo.completedCnt}개
            </span>
          </div>
          {item.newCnt > 0 && <QuestionCountBadge count={item.newCnt} />}
        </div>
      </div>
    </article>
  );
};

export const TalkBoxBottomItemCard = ({
  itemId,
  itemName,
  tagline,
  mainImg,
  isClosedItem,
}: {
  itemId: string;
  itemName: string;
  tagline: string | null;
  mainImg: string | null;
  isClosedItem: boolean;
}) => {
  const navigate = useNavigate();

  const handleItemOverViewClick = () => {
    if (!itemId) return;
    const path = generatePath(SELLER_ITEM_DETAIL, { itemId });
    navigate(path);
  };

  return (
    <div className="bottom-bar">
      {isClosedItem && <ItemClosedBanner itemId={itemId} />}
      <button
        onClick={handleItemOverViewClick}
        aria-label={`${itemName} 상세로 이동`}
        className="border-t-grey03 flex h-fit w-full cursor-pointer items-center gap-[.5625rem] self-stretch border-t border-solid bg-white px-5 py-2"
      >
        {/* 좌측 이미지 */}
        <div className="bg-grey03 relative aspect-square h-[3.125rem]">
          {mainImg && (
            <img
              className="aspect-square h-full rounded-[.0625rem] object-cover"
              src={mainImg}
              alt="상품 사진"
            />
          )}
        </div>
        {/* 우측 상품 정보 */}
        <div className="flex h-full flex-1 flex-col gap-0.5 text-left text-black">
          <p className="body2-b line-clamp-1">{itemName}</p>
          {tagline && <p className="body2-m line-clamp-1">{tagline}</p>}
        </div>
        <ArrowRightIcon className="text-grey07 h-4 w-4" />
      </button>
    </div>
  );
};

// 카테고리별 질문 페이지 상단에 있는 아이템 카드
export const TalkBoxQuestionItemCard = ({
  itemName,
  tagline,
  mainImg,
}: {
  itemName: string;
  tagline: string | null;
  mainImg: string | null;
}) => {
  return (
    <div className="border-grey03 flex h-[4.1875rem] w-full items-center gap-[1.0625rem] rounded-xs border border-solid bg-white">
      {/* 좌측 이미지 */}
      <div className="bg-grey03 relative aspect-square h-full">
        {mainImg && (
          <img
            className="aspect-square h-full rounded-[.0625rem] object-cover"
            src={mainImg}
            alt={itemName + ' 사진'}
          />
        )}
      </div>
      {/* 우측 상품 정보 */}
      <div className="flex h-full flex-1 flex-col items-start justify-center text-left">
        <p className="body2-b line-clamp-1 text-black">{itemName}</p>
        {tagline && (
          <p className="body2-m text-grey09 line-clamp-1">{tagline}</p>
        )}
      </div>
    </div>
  );
};
