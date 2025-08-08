import { AnnouncementType } from '@/types/common/AnnouncementType.types';
import KebabIcon from '@/assets/icon/common/KebabIcon.svg?react';
import PinIcon from '@/assets/icon/common/LightPinIcon.svg?react';
import { parseDateString } from '@/utils/formatDate';

const Announcement = ({
  announcement,
  handleEditAnnouncement,
}: {
  announcement: AnnouncementType;
  handleEditAnnouncement: (announcement: AnnouncementType) => void;
}) => {
  return (
    <li className="border-grey03 flex w-full cursor-pointer flex-col gap-2 border-b px-5 pt-4 pb-5">
      <div className="flex w-full flex-col">
        <div className="flex w-full items-start justify-between">
          <h1 className="body1-m min-w-0 flex-1 break-words whitespace-break-spaces">
            {announcement.title}
          </h1>
          <div className="flex w-fit shrink-0 items-center gap-[.125rem]">
            {announcement.isPrimary && (
              <PinIcon className="h-6 w-6 shrink-0 text-black" />
            )}
            <KebabIcon
              className="text-grey08 h-5 w-5 shrink-0 cursor-pointer"
              onClick={() => handleEditAnnouncement(announcement)}
            />
          </div>
        </div>
        <div className="text-grey05 caption-m">
          {parseDateString(announcement.createdAt)}
        </div>
      </div>
      <div className="body2-r break-words whitespace-pre-line">
        {announcement.content}
      </div>
    </li>
  );
};

export default Announcement;
