import { NoticeType } from '@/types/common/NoticeType.types';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import PinIcon from '@/assets/icon/common/DarkPinIcon.svg?react';
import { parseDateString } from '@/utils/formatDate';

const Notice = ({
  notice,
  handleEditNotice,
}: {
  notice: NoticeType;
  handleEditNotice: (id: number, isPrimary: boolean) => void;
}) => {
  return (
    <li className="border-grey03 flex w-full cursor-pointer flex-col gap-2 border-b px-5 pt-4 pb-5">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-start justify-between">
          <h1 className="body1-m min-w-0 flex-1 break-words whitespace-break-spaces">
            {notice.title}
          </h1>
          <div className="flex w-fit shrink-0 items-center gap-[.125rem]">
            {notice.isPrimary && (
              <PinIcon className="h-6 w-6 shrink-0 text-black" />
            )}
            <KebabIcon
              className="text-grey08 h-5 w-5 shrink-0 cursor-pointer"
              onClick={() => handleEditNotice(notice.id, notice.isPrimary!)}
            />
          </div>
        </div>
        <div className="text-grey05 caption-m">
          {parseDateString(notice.createdAt)}
        </div>
      </div>
      <div className="body2-r break-words whitespace-break-spaces">
        {notice.content}
      </div>
    </li>
  );
};

export default Notice;
