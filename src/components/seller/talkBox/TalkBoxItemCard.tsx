import { TalkBoxItem } from '@/types/seller/TalkBox.types';
import { QuestionCountBadge } from '@/components';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/routes/path';

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
