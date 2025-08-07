const InfluencerCardSkeleton = () => {
  return (
    <li className="flex shrink-0 animate-pulse flex-col items-center gap-3">
      {/* 프로필 이미지 자리 */}
      <div className="bg-grey04 h-[3.75rem] w-[3.75rem] rounded-full" />

      {/* 닉네임 & 유저네임 자리 */}
      <div className="flex w-[3.75rem] flex-col gap-1 text-center">
        <div className="bg-grey04 h-4 w-full rounded" />
        <div className="bg-grey04 mx-auto h-3.5 w-3/4 rounded" />
      </div>
    </li>
  );
};

export default InfluencerCardSkeleton;
