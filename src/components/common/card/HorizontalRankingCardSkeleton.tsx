const HorizontalRankingCardSkeleton = () => {
  return (
    <article className="flex w-full animate-pulse flex-col items-start justify-start gap-2">
      {/* 랭킹 숫자 자리 */}
      <p className="bg-grey04 h-[1.125rem] w-5 rounded-[.125rem]" />

      <div className="flex h-[6.75rem] w-full gap-2">
        {/* 이미지 + 칩 자리 */}
        <div className="bg-grey04 relative h-[6.75rem] w-[6.75rem] rounded-[.0625rem]">
          {/* 기간 칩 자리 */}
          <div className="bg-grey03 absolute bottom-0 left-0 h-4 w-7 rounded-[.125rem]" />
        </div>

        {/* 텍스트 + 타임칩 */}
        <div className="flex flex-1 flex-col justify-between">
          {/* 셀러 정보 */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1">
              <div className="bg-grey04 h-[1.375rem] w-[1.375rem] rounded-full" />
              <div className="bg-grey03 h-[0.75rem] w-[4rem] rounded-[.125rem]" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="bg-grey03 h-[1rem] w-2/5 rounded-[.125rem]" />
              <div className="bg-grey03 h-[0.75rem] w-3/5 rounded-[.125rem]" />
            </div>
          </div>

          {/* 시간칩 */}
          <div className="bg-grey03 h-[1.25rem] w-[4.2rem]" />
        </div>
      </div>
    </article>
  );
};

export default HorizontalRankingCardSkeleton;
