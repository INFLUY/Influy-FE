import Heart from '@/assets/icon/user/Heart.svg?react';
import ActiveHeart from '@/assets/icon/user/HeartActive.svg?react';

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
          className="z-10 h-6 w-6 cursor-pointer text-black"
          onClick={handleClickScrapButton}
        />
      )}
    </>
  );
};

export default ScrapButton;
