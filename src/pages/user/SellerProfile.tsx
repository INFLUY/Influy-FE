import { ItemList, ItemGrid } from '@/components/user/Item';
import { useState } from 'react';
import LayoutButton from '@/assets/icon/common/LayoutButton.svg?react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { ItemType } from '@/types/types';

const SellerProfile = () => {
  const PRODUCT_LIST: ItemType[] = [
    {
      itemId: 0,
      title:
        '[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-05-09T06:00:00',
      deadline: '2025-05-20T18:00:00',
      extend: true,
      scrapped: false,
      soldOut: false,
    },
    {
      itemId: 1,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-04-30T18:00:00',
      deadline: '2025-05-01T23:00:00',
      extend: true,
      scrapped: true,
      soldOut: false,
    },
    {
      itemId: 2,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)소현X비비안웨스트우드',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-03-20T18:00:00',
      deadline: '2025-04-30T18:30:00',
      scrapped: true,
      soldOut: true,
    },
    {
      itemId: 3,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      thumbnail: '/img1.png',
      open: '2025-04-20T18:00:00',
      deadline: '2025-05-08T18:30:00',
      scrapped: true,
      soldOut: true,
    },
  ];

  const [isGrid, setIsGrid] = useState<boolean>(true);
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
        <LayoutButton
          onClick={() => setIsGrid((prev) => !prev)}
          aria-label="레이아웃 변경 버튼"
          className="cursor-pointer"
        />
      </span>
      {PRODUCT_LIST && PRODUCT_LIST?.length !== 0 ? (
        isGrid ? (
          <ul className="grid grid-cols-2 content-start items-start gap-x-[.6875rem] gap-y-5 px-[1.125rem] pt-[2.375rem] pb-[11rem]">
            {PRODUCT_LIST?.map((item) => (
              <ItemGrid key={item?.itemId} item={item} />
            ))}
          </ul>
        ) : (
          <ul className="flex flex-col items-start gap-4 self-stretch pt-[2.375rem] pb-[11rem]">
            {PRODUCT_LIST?.map((item) => (
              <ItemList key={item?.itemId} item={item} />
            ))}
          </ul>
        )
      ) : (
        <span className="text-grey06 body-2-m flex w-full justify-center pt-[5.6875rem]">
          아직 등록한 상품이 없습니다.
        </span>
      )}
    </>
  );
};

export default SellerProfile;
