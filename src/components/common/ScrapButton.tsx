import Heart from '@/assets/icon/common/HeartIcon.svg?react';
import ActiveHeart from '@/assets/icon/common/HeartActive.svg?react';
import cn from '@/utils/cn';
const ScrapButton = ({
  scrapped,
  handleClickSave,
  additionalStyles = '',
}: {
  scrapped: boolean;
  handleClickSave: () => void;
  additionalStyles?: string;
}) => {
  const handleClickScrapButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClickSave();
  };

  return (
    <>
      {scrapped ? (
        <ActiveHeart
          className={cn(
            'text-main z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
        />
      ) : (
        <Heart
          className={cn(
            'text-grey03 z-[5] h-6 w-6 cursor-pointer',
            additionalStyles
          )}
          onClick={handleClickScrapButton}
        />
      )}
    </>
  );
};

export default ScrapButton;
