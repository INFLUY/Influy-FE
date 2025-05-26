import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SnackBar } from '@/components';

const SellerProfileHeader = ({ name, id }: { name: string; id: string }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isLinkCopiedSnackBarOpen, setIsLinkCopiedSnackBarOpen] =
    useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.01 }
    );
    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, []);

  const handleLinkCopy = () => {
    // 페이지 링크 복사
    setIsLinkCopiedSnackBarOpen(true);
  };

  return (
    <>
      <div ref={triggerRef} className="h-2 w-full bg-[#8B8B8D]" />
      <header
        className={cn(
          'fixed top-0 z-20 flex w-screen max-w-[40rem] min-w-[20rem] justify-between overflow-visible px-5 py-[.9375rem] text-white md:w-[28rem]',
          {
            'text-grey09 bg-white': scrolled,
          }
        )}
      >
        <ArrowIcon
          className="h-6 w-6 shrink-0 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        {scrolled && (
          <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="body2-m text-grey10 text-center">{name}</h1>
            <p className="caption-m text-grey06 text-center">@{id}</p>
          </span>
        )}
        <span className="flex shrink-0 gap-3">
          <SearchIcon className="h-6 w-6 cursor-pointer" />
          <ShareIcon
            onClick={handleLinkCopy}
            className="h-6 w-6 cursor-pointer"
          />
        </span>
      </header>
      {isLinkCopiedSnackBarOpen && (
        <SnackBar
          handleSnackBarClose={() => setIsLinkCopiedSnackBarOpen(false)}
        >
          링크가 클립보드에 복사되었습니다.
        </SnackBar>
      )}
    </>
  );
};

export default SellerProfileHeader;
