import LinkIcon from '@/assets/icon/common/LinkIcon.svg?react';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import { LinkType } from '@/types/seller/LinkType.types';

interface LinkProps {
  link: LinkType;
  handleEditLink?: (link: LinkType) => void;
  handleClickDelete?: () => void;
  setSelectedLink?: React.Dispatch<React.SetStateAction<LinkType | null>>;
}

const ExternalLinkChip = ({
  link,
  handleEditLink,
  handleClickDelete,
  setSelectedLink,
}: LinkProps) => {
  const ButtonClass =
    'border-grey04 bg-white flex cursor-pointer items-center justify-center gap-1 rounded-[1.5625rem] border px-3 py-2 shrink-0';

  // 일반 유저
  if (handleEditLink === undefined)
    return (
      <a href={link?.link} className={ButtonClass}>
        <LinkIcon className="text-main h-4 w-4" />
        <span className="caption-m text-grey09">{link?.linkName}</span>
      </a>
    );

  // 셀러
  const handleClickDeleteButton = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setSelectedLink?.(link);
    handleClickDelete?.();
  };

  return (
    <button
      type="button"
      className={ButtonClass}
      onClick={() => handleEditLink?.(link)}
    >
      <LinkIcon className="text-main h-4 w-4" />
      <span className="caption-m text-grey09">{link.linkName}</span>
      <MinusIcon
        className="text-grey07 h-4 w-4"
        onClick={handleClickDeleteButton}
      />
    </button>
  );
};

export default ExternalLinkChip;
