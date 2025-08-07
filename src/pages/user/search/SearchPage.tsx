import { BackButton, ItemResult, NotificationButton } from '@/components';
import XIcon from '@/assets/icon/common/XIcon2.svg?react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ItemCardType } from '@/types/common/ItemType.types';
import { PATH } from '@/routes/path';
import { useGetSearchedItems } from '@/services/search/useGetSearchedItems';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const navigate = useNavigate();
  const query = useQuery().get('q') || '';
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    setKeyword(query);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keyword.trim()) {
      navigate(`${PATH.SEARCH.BASE}?q=${encodeURIComponent(keyword.trim())}`, {
        replace: true,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleClear = () => {
    setKeyword('');
  };

  const {
    data: itemResult,
    isLoading: isItemResultLoading,
    fetchNextPage: fetchItemNextPage,
    hasNextPage: hasItemNextPage,
    isFetchingNextPage: isFetchingItemNextPage,
    totalElements: totalItems,
  } = useGetSearchedItems({ query, size: 8 });

  const itemList = itemResult?.pages
    .flatMap((page) => page?.itemPreviewList ?? [])
    .filter(Boolean) as ItemCardType[];

  return (
    <section className="bg-grey01 flex h-full w-full flex-1 pt-11">
      <header className="subhead-sb border-grey02 fixed top-0 z-30 flex h-11 w-full max-w-[40rem] min-w-[20rem] items-center justify-center gap-5 border-b bg-white px-5 text-center text-black md:w-[28rem]">
        <BackButton />
        <div className="flex flex-1 gap-4">
          <article className="relative flex h-[1.9375rem] w-full items-center justify-between">
            <input
              type="text"
              placeholder="검색어를 입력해주세요"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-grey02 body2-sb placeholder:text-grey07 placholder:body2-m relative flex w-full items-center justify-between rounded-[1.25rem] py-[.3125rem] pr-[1.875rem] pl-[.875rem] text-black"
            />
            <XIcon
              role="button"
              aria-label="지우기"
              className="bg-grey07 absolute right-[.875rem] h-4 w-4 shrink-0 rounded-full p-[.2775rem] text-white"
              onClick={handleClear}
            />
          </article>
          <NotificationButton />
        </div>
      </header>
      <article className="flex flex-1">
        {query && (
          <div className="flex flex-1 gap-3">
            {/* 검색 결과 렌더링 자리 */}
            <ItemResult
              isLoading={isItemResultLoading}
              itemList={itemList}
              fetchNextPage={fetchItemNextPage}
              hasNextPage={hasItemNextPage}
              isFetchingNextPage={isFetchingItemNextPage}
              total={totalItems}
            />
          </div>
        )}
      </article>
    </section>
  );
};

export default SearchPage;
