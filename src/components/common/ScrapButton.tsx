import Heart from '@/assets/icon/common/HeartIcon.svg?react';
import ActiveHeart from '@/assets/icon/common/HeartActive.svg?react';

const ScrapButton = ({
  scrapped,
  handleClickSave,
}: {
  scrapped: boolean;
  handleClickSave: () => void;
}) => {
  const handleClickScrapButton = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClickSave();
  };

  return (
    <>
      {scrapped ? (
        <Heart
          className="text-grey03 z-10 h-6 w-6 cursor-pointer"
          onClick={handleClickScrapButton}
        />
      ) : (
        <ActiveHeart
          className="text-main z-10 h-6 w-6 cursor-pointer"
          onClick={handleClickScrapButton}
        />
      )}
    </>
  );
};

export default ScrapButton;
