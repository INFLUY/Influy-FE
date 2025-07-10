import Chevron from '@/assets/icon/common/Chevron.svg?react';

const NoticeBanner = ({
  title = '',
  count = 0,
  onClickNotice,
  seller = false,
}: {
  title?: string;
  count: number;
  onClickNotice: () => void;
  seller?: boolean;
}) => {
  // 셀러가 보는 공지
  if (seller) {
    if (count === 0)
      return (
        <article
          onClick={onClickNotice}
          className="text-grey06 caption-m relative flex h-[2.3125rem] w-full shrink-0 cursor-pointer items-center justify-center rounded-[.1875rem] bg-white text-center"
        >
          아직 공지가 없습니다. 공지를 등록해 주세요!
          <Chevron className="text-grey07 absolute right-2 h-4 w-4 shrink-0" />
        </article>
      );
    else {
      return (
        <article
          onClick={onClickNotice}
          className="flex h-[2.3125rem] w-full shrink-0 cursor-pointer items-center justify-between gap-2 rounded-[.1875rem] bg-white px-2 text-center"
        >
          <span className="flex items-center gap-[.125rem] truncate">
            <span className="body2-b shrink-0 text-center">[공지]</span>
            <span className="text-grey09 caption-m truncate text-center">
              {title}
            </span>
          </span>
          <Chevron className="text-grey07 flex h-4 w-4 shrink-0" />
        </article>
      );
    }
  }
  // 일반 유저가 보는 공지
  return (
    <article
      onClick={onClickNotice}
      className="flex h-[2.3125rem] w-full shrink-0 cursor-pointer items-center justify-between rounded-[.1875rem] bg-white px-2 text-center"
    >
      <div className="flex items-center gap-[.125rem] truncate text-center">
        <span className="body2-b shrink-0 text-center">[공지]</span>
        <span className="text-grey09 caption-m truncate text-center">
          {title}
        </span>
      </div>
      {count > 1 && (
        <span className="text-grey07 body2-m shrink-0 text-center">
          +{count}
        </span>
      )}
    </article>
  );
};

export default NoticeBanner;
