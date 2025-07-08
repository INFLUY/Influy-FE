import EyeIcon from '@/assets/icon/common/EyeIcon.svg?react';
import SettingsIcon from '@/assets/icon/common/SettingsIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import { SnackBar } from '@/components';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SellerMyProfileHeader = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const triggerRef = useRef(null);
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
          'fixed top-0 z-20 flex w-screen max-w-[40rem] min-w-[20rem] justify-end overflow-visible px-5 py-[.9375rem] text-white md:w-[28rem]',
          {
            'bg-black': scrolled,
          }
        )}
      >
        <span className="flex shrink-0 gap-3">
          <button
            type="button"
            className="bg-grey01 flex cursor-pointer items-center gap-1 rounded-[.125rem] px-2 py-[.1875rem]"
          >
            <EyeIcon className="text-grey08 h-[.875rem] w-[.875rem]" />
            <span
              className="caption-m text-grey08"
              onClick={() => navigate('')}
            >
              미리보기
            </span>
          </button>
          <ShareIcon
            onClick={handleLinkCopy}
            className="h-6 w-6 cursor-pointer text-white"
          />
          <SettingsIcon className="h-6 w-6 cursor-pointer text-white" />
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

export default SellerMyProfileHeader;
