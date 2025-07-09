import { ItemGrid } from '@/components/user/common/Item';
import { useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { ItemType } from '@/types/common/ItemType.types';

const SelectionTab = () => {
  const PRODUCT_LIST: ItemType[] = [
    {
      itemId: 0,
      title:
        '[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-07-10T06:34:07.837159',
      deadline: '2025-07-30T19:00:07.837159',
      extend: false,
      scrapped: false,
      soldOut: false,
    },
    {
      itemId: 1,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-05-29T06:34:07.837159',
      deadline: '2025-06-10T19:00:07.837159',
      extend: true,
      scrapped: true,
      soldOut: false,
    },
    {
      itemId: 2,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)소현X비비안웨스트우드',
      name: '@dfkjdkfjdkfj',
      content:
        '🖤완판 재진행🖤 너무 예쁜 가디건🖤완판 재진행🖤 너무 예쁜 가디건🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-06-03T23:59:07.837159',
      deadline: '2025-06-10T19:00:07.837159',
      scrapped: true,
      soldOut: true,
    },
    {
      itemId: 3,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      thumbnail: '/img1.png',
      open: '2025-05-29T06:34:07.837159',
      deadline: '2025-05-30T19:00:07.837159',
      scrapped: false,
      soldOut: false,
    },
    {
      itemId: 4,
      title:
        '소현X비비안웨스트우드 가디건 (색상 5가지/블루/핑크/화이)트트틑트트트트',
      name: '@dfkjdkfjdkfj',
      thumbnail: '/img1.png',
      open: '2025-06-03T23:59:07.837159',
      deadline: '2025-06-10T19:00:07.837159',
      scrapped: true,
      soldOut: false,
    },
    {
      itemId: 5,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      thumbnail: '/img1.png',
      open: '2025-06-02T23:59:07.837159',
      deadline: '2025-06-04T18:00:07.837159',
      scrapped: true,
      soldOut: false,
    },
  ];

  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  return (
    <section className="flex w-full flex-col gap-4 pt-5 pb-36">
      <span className="flex w-full justify-start px-5">
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
            className="text-grey08 caption-m flex cursor-pointer items-center justify-center gap-[.375rem] text-center align-middle"
          >
            {inProgress ? <CheckBoxOn /> : <CheckBoxOff />}
            <span>진행 중인 상품만 보기</span>
          </label>
        </span>
      </span>
      {PRODUCT_LIST && PRODUCT_LIST?.length !== 0 ? (
        <ul className="grid grid-cols-2 content-start items-start gap-x-[.1875rem] gap-y-8">
          {PRODUCT_LIST?.map((item) => (
            <ItemGrid key={item?.itemId} item={item} />
          ))}
        </ul>
      ) : (
        <span className="text-grey06 body-2-m flex w-full justify-center pt-[5.8125rem]">
          아직 등록된 상품이 없습니다.
        </span>
      )}
    </section>
  );
};

export default SelectionTab;
