import { useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { MyItem } from '@/types/types';
import { Item } from '@/components/seller/Item';

const SellerMyPage = () => {
  const PRODUCT_LIST: MyItem[] = [
    {
      itemId: 0,
      title:
        '[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-05-09T06:00:00',
      deadline: '2025-05-20T18:00:00',
      range: [],
      status: 'basic',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 1,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      content: '🖤완판 재진행🖤너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-04-30T18:00:00',
      deadline: '2025-05-01T23:00:00',
      range: ['recommend', 'search'],
      status: 'basic',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 2,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-03-20T18:00:00Z',
      deadline: '2025-04-30T18:30:00Z',
      range: ['recommend'],
      status: 'basic',
      pending: 20,
      answered: 10,
    },
    {
      itemId: 3,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      content: '🖤완판 재진행🖤',
      thumbnail: '/img1.png',
      open: '2025-04-20T18:00:00Z',
      deadline: '2025-05-08T18:30:00Z',
      range: ['search'],
      status: 'basic',
      pending: 20,
      answered: 10,
    },
  ];

  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  return (
    <>
      <span className="flex w-full justify-between px-5 pt-[1.125rem]">
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
          onClick={() => {}}
          className="caption-m text-grey08 cursor-pointer text-center"
        >
          정렬 방식 :{' '}
        </button>
      </span>
      {PRODUCT_LIST && PRODUCT_LIST?.length !== 0 && (
        <ul className="flex flex-col items-start gap-5 self-stretch">
          {PRODUCT_LIST?.map((item) => <Item key={item?.itemId} item={item} />)}
        </ul>
      )}
    </>
  );
};

export default SellerMyPage;
