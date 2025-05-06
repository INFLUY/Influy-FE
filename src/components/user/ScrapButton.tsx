import Heart from "@/assets/icon/user/Heart.svg?react";
import ActiveHeart from "@/assets/icon/user/HeartActive.svg?react";

const ScrapButton = ({
  scrapped,
  handleClickSave,
}: {
  scrapped: boolean;
  handleClickSave: () => void;
}) => {
  return (
    <>
      {scrapped ? (
        <Heart
          className="text-grey03 w-6 h-6 z-10 cursor-pointer"
          onClick={handleClickSave}
        />
      ) : (
        <ActiveHeart
          className="text-black w-6 h-6 z-10 cursor-pointer"
          onClick={handleClickSave}
        />
      )}
    </>
  );
};

export default ScrapButton;
