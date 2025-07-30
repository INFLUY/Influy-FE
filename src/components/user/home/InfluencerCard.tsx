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
  influencer: InfluencerCardType;
  selectedInfluencer: number;
  setSelectedInfluencer: (id: number) => void;
}) => {
  return (
    <li
      className="flex shrink-0 cursor-pointer flex-col items-center gap-2"
      onClick={() => setSelectedInfluencer(influencer.id)}
    >
      <div className="relative h-fit w-fit">
        <img
          src={influencer.profileImage}
          alt="프로필 사진"
          className="aspect-square h-[3.75rem] rounded-full object-cover"
        />
        {selectedInfluencer === influencer.id && (
          <span className="border-main absolute top-0 left-0 z-[1] h-full w-full rounded-full border-[1.5px]" />
        )}
      </div>
      <div className="flex w-[3.75rem] flex-col items-center self-stretch text-[.8086rem] leading-[150%] tracking-[-0.0008rem]">
        <p className="text-grey10 line-clamp-1 font-semibold">
          {influencer.nickname}
        </p>
        <p className="text-grey09 line-clamp-1 font-normal">
          {influencer.username}
        </p>
      </div>
    </li>
  );
};

export default InfluencerCard;
