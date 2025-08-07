const ItemAlbumCardSkeleton = () => {
  return (
    <article className="flex w-full animate-pulse flex-col gap-1.5">
      {/* 상단 사진 부분 스켈레톤 */}
      <div className="bg-grey02 relative flex aspect-square h-fit w-full flex-1/2 shrink-0">
        {/* 이미지 자리 */}
        <div className="bg-grey04 h-full w-full" />

        {/* 좋아요 버튼 자리 (우측 상단) */}
        <div className="bg-grey04 absolute top-2 right-3 h-6 w-6 rounded-full" />

        {/* 마감 텍스트 자리 (필요 시 보여주도록) */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 text-white">
          {/* 투명하게 두고 필요 시 넣기 */}
        </div>

        {/* 칩들 자리 (좌측 하단) */}
        <div className="absolute bottom-0 left-0 flex flex-wrap">
          <div className="bg-grey04 h-5 w-16" />
        </div>
      </div>

      {/* 하단 글 부분 스켈레톤 */}
      <div className="flex w-full flex-col gap-1 px-2.5">
        {/* 셀러 정보 */}
        <div className="flex items-center gap-1">
          <div className="bg-grey04 h-[1.375rem] w-[1.375rem] rounded-full" />
          <div className="bg-grey04 h-4 w-16 rounded" />
        </div>

        {/* 상품명 및 태그라인 */}
        <div className="flex h-[5.25rem] flex-col gap-1">
          <div className="bg-grey04 h-5 w-full rounded" />
          <div className="bg-grey04 h-4 w-3/4 rounded" />
          <div className="bg-grey04 h-4 w-1/2 rounded" />
        </div>
      </div>
    </article>
  );
};

export default ItemAlbumCardSkeleton;
