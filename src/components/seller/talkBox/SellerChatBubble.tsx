import ArrowRight from '@/assets/icon/common/ArrowRight16.svg?react';
import CheckOn from '@/assets/icon/common/CheckCircleOn.svg?react';
import CheckOff from '@/assets/icon/common/CheckCircleOff.svg?react';
import { useSelectModeStore } from '@/store/talkBoxStore';
import cn from '@/utils/cn';
import { formatIsoToTimeOrDate } from '@/utils/formatDate';

interface SellerChatBubbleProps {
  questionId: number;
  content: string;
  profileImg: string | null;
  username: string;
  isChecked: boolean;
  askedCount: number;
  createdAt: string;
  selectedSubCategory?: string;
}

const SellerChatBubble = ({
  questionId,
  content,
  profileImg,
  username,
  askedCount,
  isChecked,
  createdAt,
  selectedSubCategory,
}: SellerChatBubbleProps) => {
  const { selectedIds, setSelectedIds, isSelectMode } = useSelectModeStore();
  const isSelected = selectedIds.includes(questionId);

  const handleCheckboxClick = () => {
    if (!isSelectMode) return;
    if (isSelected) {
      setSelectedIds(selectedIds.filter((id) => id !== questionId));
    } else {
      setSelectedIds([...selectedIds, questionId]);
    }
  };

  return (
    <article className="grid w-full grid-cols-[1fr_auto] grid-rows-[auto_auto] items-start gap-x-2.5 gap-y-1 px-5">
      {/* 상단 유저 및 시간 */}
      <div className="col-span-1 col-start-1 row-span-1 row-start-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-grey03 flex h-8 w-8 items-center justify-center rounded-full">
            {profileImg && (
              <img
                className="aspect-square h-full object-cover"
                src={profileImg}
                alt={username + '님의 프로필 사진'}
              />
            )}
          </div>
          <span className="body2-m text-grey10">{username}</span>
          <div className="bg-sub-light text-grey09 caption-m rounded-[.1875rem] px-1.5 py-0.5">
            {askedCount}회질문
          </div>
        </div>
        <span className="caption-m text-grey08">
          {formatIsoToTimeOrDate(createdAt)}
        </span>
      </div>
      {/* 말풍선 */}
      <div
        onClick={() => handleCheckboxClick()}
        className={cn(
          'border-grey02 bg-grey02 body2-m relative col-span-1 col-start-1 row-span-1 row-start-2 ml-10 flex h-fit shrink-0 cursor-pointer flex-col items-end gap-1 rounded-lg border border-solid px-[.875rem] pt-2 pb-2.5',
          isSelected && 'border-black'
        )}
      >
        <p className="text-sub w-full">#{selectedSubCategory}</p>
        {!isChecked && (
          <div className="bg-main absolute top-3 right-3 h-1.5 w-1.5 rounded-full" />
        )}
        <p className="line-clamp-4 w-full text-left text-[#292929]">
          {content}
        </p>
      </div>
      {/* 우측 화실표 및 체크박스 */}
      <div className="col-start-2 row-start-2 flex h-full w-6 cursor-pointer items-center justify-end">
        {!isSelectMode ? (
          <ArrowRight className="text-grey06" />
        ) : isSelected ? (
          <CheckOn className="h-6 w-6" onClick={() => handleCheckboxClick()} />
        ) : (
          <CheckOff className="h-6 w-6" onClick={() => handleCheckboxClick()} />
        )}
      </div>
    </article>
  );
};

export default SellerChatBubble;
