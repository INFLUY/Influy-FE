import { LikedInfluencerListType } from '@/types/user/Like.types';
import { formatNumber } from '@/utils/formatNumber';
import { useState } from 'react';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';
import ScrapButton from '@/components/common/ScrapButton';
import { generatePath, useNavigate } from 'react-router-dom';
import { MARKET_DEATIL } from '@/utils/generatePath';

const MyLikedInfluencerBox = ({
  influencer,
}: {
  influencer: LikedInfluencerListType;
}) => {
  const navigate = useNavigate();

  const [like, setLike] = useState<boolean>(true);

  const handleLikeClick = () => {
    setLike((prev) => !prev);
  };

  return (
    <li
      className="flex w-full justify-between px-5 py-3"
      aria-label={influencer.nickName + '프로필 바로가기'}
      role="button"
      onClick={() =>
        navigate(generatePath(MARKET_DEATIL, { marketId: influencer.sellerId }))
      }
    >
      <div className="flex gap-3">
        <img
          src={
            influencer.profileImgLink === ''
              ? ProfileIcon
              : influencer.profileImgLink
          }
          alt={influencer.nickName + ' 프로필 이미지'}
          className="h-15 w-15 rounded-full object-cover"
        />
        <div className="flex flex-col justify-center">
          <p className="body1-b text-black">{influencer.nickName}</p>
          <p className="text-grey08 body2-m">@{influencer.userName}</p>
        </div>
      </div>
      <div className="flex min-w-11 flex-col items-center justify-center gap-[.125rem]">
        <ScrapButton
          scrapped={like}
          handleClickSave={handleLikeClick}
          additionalStyles=""
        />
        <span className="body2-m text-grey07">
          {formatNumber(influencer.likeCount)}
        </span>
      </div>
    </li>
  );
};

export default MyLikedInfluencerBox;
