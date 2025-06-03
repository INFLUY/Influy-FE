import { useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { MyItem } from '@/types/seller/MyItem.types';
import PlusIcon from '@/assets/icon/common/PlusIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { RadioBottomSheet, SellerMyItem } from '@/components';
import Arrow from '@/assets/icon/common/Chevron.svg?react';
import cn from '@/utils/cn';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';

const MySelectionTab = () => {
  const navigate = useNavigate();

  const PRODUCT_LIST: MyItem[] = [
    {
      itemId: 0,
      title:
        '[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지',
      thumbnail: '/img1.png',
      open: '2025-05-30T23:00:00',
      deadline: '2025-07-20T18:00:00',
      status: 'basic',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 1,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      thumbnail: '/img1.png',
      open: '2025-04-30T18:00:00',
      deadline: '2025-05-25T23:00:00',
      status: 'sold out',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 2,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      thumbnail: '/img1.png',
      open: '2025-03-20T18:00:00',
      deadline: '2025-06-30T18:30:00',
      status: 'basic',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 3,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      thumbnail: '/img1.png',
      open: '2025-05-29T06:34:07.837159',
      deadline: '2025-05-30T19:00:07.837159',
      status: 'basic',
      pending: 20,
      answered: 10,
    },
  ];

  const [inProgress, setInProgress] = useState<boolean>(false);
  const [isSortByOpen, setIsSortByOpen] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  // 임시 정렬 상태
  const SORT_BY = '등록순';

  const SORT_BY_LIST: RadioInputList[] = [
    { id: 0, text: '마감일 빠른 순' },
    { id: 1, text: '등록 순' },
  ];

  return (
    <section className="flex w-full flex-col gap-4 pt-5 pb-36">
      <span className="flex w-full justify-between px-5">
        <span className="flex cursor-pointer items-center gap-[.375rem]">
          <input
            type="checkbox"
            id="filterItemInProgress"
            hidden
            checked={inProgress}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="filterItemInProgress"
            className="text-grey08 caption-m flex cursor-pointer items-center gap-[.375rem]"
          >
            {inProgress ? <CheckBoxOn /> : <CheckBoxOff />}
            진행 중인 상품만 보기
          </label>
        </span>
        <button
          type="button"
          onClick={() => setIsSortByOpen(true)}
          className="caption-m text-grey08 flex cursor-pointer items-center gap-1 px-[.625rem] py-[.1875rem] text-center"
        >
          정렬 방식 : <span className="caption-b text-grey09">{SORT_BY}</span>{' '}
          <Arrow
            className={cn('text-grey07 h-3 w-3 rotate-90', {
              '-rotate-90': isSortByOpen,
            })}
          />
        </button>
      </span>

      {/* 정렬 방식 설정 모달 */}
      {isSortByOpen && (
        <RadioBottomSheet
          title="정렬방식"
          description="설정한 정렬대로 유저에게 보여집니다."
          list={SORT_BY_LIST}
          isOpen={isSortByOpen}
          setIsOpen={setIsSortByOpen}
        />
      )}

      {PRODUCT_LIST && PRODUCT_LIST?.length !== 0 && (
        <ul className="flex flex-col items-start gap-5 self-stretch pb-1">
          {PRODUCT_LIST?.map((item) => (
            <SellerMyItem key={item?.itemId} item={item} />
          ))}
        </ul>
      )}
      <div className="flex w-full px-5">
        <button
          className="text-grey07 body2-m border-grey03 flex h-[6.125rem] w-full cursor-pointer items-center justify-center gap-1 border"
          onClick={() => navigate('')}
        >
          <PlusIcon />
          <span>상품 추가</span>
        </button>
      </div>
    </section>
  );
};

export default MySelectionTab;
