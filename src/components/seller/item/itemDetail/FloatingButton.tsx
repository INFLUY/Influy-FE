import { ToolTip } from '@/components';
import TalkBoxIcon from '@/assets/icon/common/TalkBoxIcon.svg?react';
import { TalkBoxOpenStatusType } from '@/types/common/ItemType.types';
import cn from '@/utils/cn';

export const FloatingButton = ({
  talkBoxOpenStatus,
  showTooltip,
  itemId,
  handleTalkBoxButtonClick,
  unchecked,
}: {
  talkBoxOpenStatus: TalkBoxOpenStatusType;
  showTooltip: boolean;
  itemId: number;
  handleTalkBoxButtonClick: () => void;
  unchecked: boolean;
}) => {
  const toolTipText = () => {
    if (talkBoxOpenStatus === 'OPENED' && unchecked)
      return '이 상품의 질문에 답변해 주세요.';
    else if (talkBoxOpenStatus === 'OPENED')
      return '해당 상품의 톡박스로 바로 이동!';
    else return '이 상품의 톡박스를 활성화해보세요.';
  };
  return (
    <div className="pointer-events-none fixed right-5 bottom-20 z-[1] flex flex-col items-end gap-1.5">
      <ToolTip
        text={toolTipText()}
        position="right"
        additionalStyles={cn(
          'pointer-events-none transition-opacity duration-500',
          showTooltip ? 'opacity-100' : 'opacity-0'
        )}
      />

      {itemId && (
        <button
          type="button"
          onClick={() => {
            handleTalkBoxButtonClick();
          }}
          className={cn(
            'pointer-events-auto relative flex aspect-[1/1] h-11 w-11 cursor-pointer flex-col items-center justify-center rounded-full bg-black shadow-[0_.25rem_1.125rem_0_rgba(0,0,0,0.25)]',
            talkBoxOpenStatus === 'OPENED' ? 'bg-black' : 'bg-grey08'
          )}
        >
          <TalkBoxIcon className="h-6 w-6 text-white" />
          {unchecked && (
            <div className="bg-main absolute top-[.6875rem] right-[.6875rem] h-1.5 w-1.5 rounded-full" />
          )}
        </button>
      )}
    </div>
  );
};
