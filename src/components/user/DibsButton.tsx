import Heart from "@/assets/icon/user/Heart.svg?react";
import ActiveHeart from "@/assets/icon/user/HeartActive.svg?react";

const DibsButton = ({
  saved,
  handleClickSave,
}: {
  saved: boolean;
  handleClickSave: () => void;
}) => {
  return (
    <>
      {saved ? (
        <Heart className="text-grey03 w-6 h-6" onClick={handleClickSave} />
      ) : (
        <ActiveHeart className="text-black w-6 h-6" onClick={handleClickSave} />
      )}
    </>
  );
};

export default DibsButton;
