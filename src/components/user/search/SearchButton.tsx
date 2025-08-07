import SearchIcon from '@/assets/icon/common/SearchIcon.svg?react';
import { PATH } from '@/routes/path';
import { useNavigate } from 'react-router-dom';

const SearchButton = () => {
  const navigate = useNavigate();

  return (
    <SearchIcon
      role="button"
      aria-label="검색창으로 이동하기"
      className="h-6 w-6 cursor-pointer text-black"
      onClick={() => navigate(PATH.SEARCH.BASE)}
    />
  );
};

export default SearchButton;
