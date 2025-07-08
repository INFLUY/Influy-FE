import LinkIcon from '@/assets/icon/common/LinkIcon.svg?react';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';

interface LinkProps {
  linkId?: number;
  name: string;
  url: string;
  handleEditLink?: (linkId: number) => void;
}

const ExternalLinkChip = ({ linkId, name, url, handleEditLink }: LinkProps) => {
  const ButtonClass =
    'border-grey04 bg-white flex cursor-pointer items-center justify-center gap-1 rounded-[1.5625rem] border px-3 py-2 shrink-0';

  if (handleEditLink && linkId !== undefined) {
    return (
      <button
        type="button"
        className={ButtonClass}
        onClick={() => handleEditLink(linkId)}
      >
        <LinkIcon className="text-main h-4 w-4" />
        <span className="caption-m text-grey09">{name}</span>
        <MinusIcon className="text-grey07 h-4 w-4" />
      </button>
    );
  }
  return (
    <a href={url} className={ButtonClass}>
      <LinkIcon className="text-main h-4 w-4" />
      <span className="caption-m text-grey09">{name}</span>
    </a>
  );
};

export default ExternalLinkChip;
