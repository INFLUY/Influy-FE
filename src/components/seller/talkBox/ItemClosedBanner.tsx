import ArrowRight from '@/assets/icon/common/ArrowRight10.svg?react';
export const ItemClosedBanner = ({
  onClickBanner,
}: {
  onClickBanner: () => void;
}) => {
  return (
    <div
      role="status"
      aria-label="상품 비활성화 안내"
      className="bg-grey03 body2-m flex w-full items-center justify-between px-4 py-1.5"
    >
      <p className="text-grey09 sr-only">해당 상품은 비활성화된 상태입니다.</p>
      <span aria-hidden="true">
        해당 상품의 톡박스가 비활성화 되어있습니다.
      </span>
      <button
        type="button"
        className="text-grey07 flex cursor-pointer items-center gap-0.5"
        aria-label="상품 상태 변경 페이지로 이동"
        onClick={onClickBanner}
      >
        상태변경
        <ArrowRight />
      </button>
    </div>
  );
};
