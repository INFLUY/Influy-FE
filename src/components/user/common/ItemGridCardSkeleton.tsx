const ItemGridCardSkeleton = () => {
  return (
    <li className="flex w-full animate-pulse flex-col gap-[.625rem] self-start">
      {/* 썸네일 영역 */}
      <div className="relative flex aspect-square w-full shrink-0 justify-end p-2">
        <div className="bg-grey03 absolute inset-0 h-full w-full rounded-[.125rem]" />
        {/* 칩 자리 */}
        <div className="bg-grey05 absolute bottom-0 left-0 flex h-5 w-8" />
        <div className="bg-grey04 absolute bottom-0 left-8 flex h-5 w-15" />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex h-[5.25rem] flex-col items-start justify-between gap-2 px-3">
        <div className="flex w-full flex-col gap-2">
          <div className="bg-grey04 h-4 w-2/5" />
          <div className="bg-grey03 h-3 w-full" />
          <div className="bg-grey03 h-3 w-4/5" />
        </div>
      </div>
    </li>
  );
};

export default ItemGridCardSkeleton;
