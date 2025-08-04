import { SellerThumbnailType } from '@/types/user/Home.types';
import ProfileIcon from '@/assets/icon/common/ProfileBasic.svg';

export interface InfluencerCardType {
  id: number;
  nickname: string;
  username: string;
  profileImage: string;
}

const InfluencerCard = ({
  influencer,
  selectedInfluencer,
  setSelectedInfluencer,
}: {
  influencer: SellerThumbnailType;
  selectedInfluencer: number | null;
  setSelectedInfluencer: ({
    id,
    nickname,
  }: {
    id: number | null;
    nickname: string;
  }) => void;
}) => {
  return (
    <li
      className="flex shrink-0 cursor-pointer flex-col items-center gap-2"
      onClick={() =>
        setSelectedInfluencer({
          id: influencer.sellerId,
          nickname: influencer.sellerNickname,
        })
      }
    >
      <div className="relative h-fit w-fit">
        <img
          src={influencer.profileImg ?? ProfileIcon}
          alt={influencer.sellerNickname + '님 프로필 사진'}
          className="aspect-square h-[3.75rem] w-[3.75rem] rounded-full bg-white object-cover"
        />
        {selectedInfluencer === influencer.sellerId && (
          <span className="border-main absolute top-0 left-0 z-[1] h-full w-full rounded-full border-[1.5px]" />
        )}
      </div>
      <div className="flex w-[3.75rem] min-w-0 flex-col items-center text-center text-[.8086rem] leading-[150%] tracking-[-0.0008rem]">
        <p className="text-grey10 line-clamp-1 w-full font-semibold break-words">
          {influencer.sellerNickname}
        </p>
        <p className="text-grey09 line-clamp-1 w-full font-normal break-words">
          {influencer.sellerUsername}
        </p>
      </div>
    </li>
  );
};

export default InfluencerCard;
