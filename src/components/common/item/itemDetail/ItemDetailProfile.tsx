import ArrowRightIcon from '@/assets/icon/common/ArrowRight16.svg?react';
import { SellerOverviewDTO } from '@/types/seller/SellerProfile.types';
import { MARKET_DETAIL } from '@/utils/generatePath';
import { generatePath, useNavigate } from 'react-router-dom';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';

export const ItemDetailProfile = ({
  sellerInfo,
}: {
  sellerInfo: SellerOverviewDTO;
}) => {
  const navigate = useNavigate();

  return (
    <button
      className="bg-grey01 flex h-fit w-full cursor-pointer items-center justify-between px-5 py-3"
      type="button"
      aria-label={sellerInfo.sellerNickname + ' 프로필 바로가기'}
      onClick={() =>
        navigate(generatePath(MARKET_DETAIL, { marketId: sellerInfo.sellerId }))
      }
    >
      <div className="flex h-full w-full items-center gap-3">
        <img
          src={sellerInfo.profileImg ?? ProfileIcon}
          alt={sellerInfo.sellerNickname + ' 프로필 사진'}
          className="h-[3.75rem] w-[3.75rem] rounded-full object-cover"
        />

        <div className="flex flex-col text-left">
          <span className="body1-b text-black">
            {sellerInfo.sellerNickname}
          </span>
          <span className="body2-m text-grey08">
            @{sellerInfo.sellerUsername}
          </span>
        </div>
      </div>
      <ArrowRightIcon className="text-grey07 h-4 w-4" />
    </button>
  );
};
