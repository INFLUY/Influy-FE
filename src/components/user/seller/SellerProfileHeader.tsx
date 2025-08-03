import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import cn from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCopyUrl from '@/utils/useCopyUrl';

const SellerProfileHeader = ({
  name,
  id,
  seller,
}: {
  name: string;
  id: string;
  seller: boolean;
}) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const copyUrl = useCopyUrl();
  const newRootMargin = seller ? '-81px 0px 0px 0px' : '0px';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0.01, rootMargin: newRootMargin }
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

  return (
    <>
      <div ref={triggerRef} className="absolute top-0 h-2 w-full" />
      <header
        className={cn(
          'fixed top-0 z-20 flex w-screen max-w-[40rem] min-w-[20rem] justify-between overflow-visible px-5 py-[.9375rem] text-white md:w-[28rem]',
          {
            'text-grey09 bg-white': scrolled,
            'top-[5.0625rem] justify-end': seller,
          }
        )}
      >
        {!seller && (
          <ArrowIcon
            className="h-6 w-6 shrink-0 cursor-pointer"
            onClick={() => navigate(-1)}
          />
        )}
        {scrolled && (
          <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="body2-m text-grey10 text-center">{name}</h1>
            <p className="caption-m text-grey06 text-center">@{id}</p>
          </span>
        )}
        <span className="flex shrink-0 gap-3">
          <SearchIcon className="h-6 w-6 cursor-pointer" />
          <ShareIcon
            onClick={() => copyUrl()}
            className="h-6 w-6 cursor-pointer"
          />
        </span>
      </header>
    </>
  );
};

export default SellerProfileHeader;
