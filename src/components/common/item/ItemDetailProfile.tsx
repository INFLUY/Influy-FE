import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';
import { SellerCard } from '@/types/common/ItemType.types';
import { MARKET_DEATIL } from '@/utils/generatePath';
import { generatePath, useNavigate } from 'react-router-dom';

export const ItemDetailProfile = ({ seller }: { seller: SellerCard }) => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-grey01 flex h-fit w-full cursor-pointer items-center justify-between px-5 py-3"
      type="button"
      aria-label={seller.nickname + ' 프로필 바로가기'}
      onClick={() =>
        navigate(generatePath(MARKET_DEATIL, { marketId: seller.id }))
      }
    >
      <div className="flex h-full w-full items-center gap-3">
        <img
          src={seller.profileImg}
          alt={seller.nickname + ' 프로필 사진'}
          className="h-[3.75rem] w-[3.75rem] rounded-full object-cover"
        />
        <div className="flex flex-col text-left">
          <span className="body1-b text-black">{seller.nickname}</span>
          <span className="body2-m text-grey08">@{seller.instagram}</span>
        </div>
      </div>
      <ArrowRightIcon className="h-4 w-4" />
    </button>
  );
};
