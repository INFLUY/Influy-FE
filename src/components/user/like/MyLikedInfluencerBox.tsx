import { SellerLikeList } from '@/types/user/Like.types';
import { formatNumber } from '@/utils/formatNumber';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import { generatePath, useNavigate } from 'react-router-dom';
import { MARKET_DETAIL } from '@/utils/generatePath';
import { SellerLikeButton } from '@/components';

const MyLikedInfluencerBox = ({
  influencer,
}: {
  influencer: SellerLikeList;
}) => {
  const navigate = useNavigate();

  return (
    <li
      className="flex w-full cursor-pointer justify-between px-5 py-3"
      aria-label={influencer.nickName + '프로필 바로가기'}
      role="button"
      onClick={() =>
        navigate(generatePath(MARKET_DETAIL, { marketId: influencer.sellerId }))
      }
    >
      <div className="flex gap-3">
        <img
          src={influencer.profileImgLink ?? ProfileIcon}
          alt={influencer.nickName + '님 프로필 이미지'}
          className="h-15 w-15 rounded-full bg-white object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="body1-b text-black">{influencer.nickName}</p>
          <p className="text-grey08 body2-m">@{influencer.userName}</p>
        </div>
      </div>
      <div className="flex min-w-11 flex-col items-center justify-center gap-[.125rem]">
        <SellerLikeButton
          sellerId={influencer.sellerId}
          liked={influencer.liked}
        />
        <span className="body2-m text-grey07">
          {formatNumber(influencer.likeCnt)}
        </span>
      </div>
    </li>
  );
};

export default MyLikedInfluencerBox;
