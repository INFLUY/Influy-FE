import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';
const AccoutSettingsMenuButton = ({
  title,
  subText,
  onClick,
}: {
  title: string;
  subText?: string;
  onClick: () => void;
}) => {
  return (
    <button
      type="button"
      className="flex h-[3.625rem] w-full cursor-pointer items-center justify-between px-5"
      onClick={onClick}
    >
      <span className="body1-m text-grey10">{title}</span>
      <span className="text-grey07 flex items-center gap-[.625rem]">
        {subText && (
          <span aria-label={title} className="body2-m">
            {subText}
          </span>
        )}
        <ArrowRightIcon />
      </span>
    </button>
  );
};
export default AccoutSettingsMenuButton;
