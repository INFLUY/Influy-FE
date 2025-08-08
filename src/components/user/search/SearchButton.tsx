import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';
import cn from '@/utils/cn';

const SearchButton = ({ color = 'black' }: { color?: string }) => {
  const navigate = useNavigate();

  return (
    <SearchIcon
      role="button"
      aria-label="검색창으로 이동하기"
      className={cn('h-6 w-6 cursor-pointer', color && `text-${color}`)}
      onClick={() => navigate(PATH.SEARCH.BASE)}
    />
  );
};

export default SearchButton;
