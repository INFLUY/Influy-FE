import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import { BackButton } from '@/components/common/BackButton';
import cn from '@/utils/cn';
import { useCopyMarketUrl } from '@/utils/useCopyUrl';
import { useEffect, useRef, useState } from 'react';
import SearchButton from '../search/SearchButton';

const SellerProfileHeader = ({
  name,
  id,
  sellerId,
  isSeller,
}: {
  name: string;
  id: string;
  sellerId: number;
  isSeller: boolean;
}) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const copyUrl = useCopyMarketUrl(sellerId);
  const newRootMargin = isSeller ? '-81px 0px 0px 0px' : '0px';

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
            'top-[5.0625rem] justify-end': isSeller,
          }
        )}
      >
        {!isSeller && <BackButton />}
        {scrolled && (
          <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <h1 className="body2-m text-grey10 text-center">{name}</h1>
            <p className="caption-m text-grey06 text-center">@{id}</p>
          </span>
        )}
        <span className="flex shrink-0 gap-3">
          <SearchButton color="white" />
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
