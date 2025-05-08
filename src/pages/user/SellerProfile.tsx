import { ProductList, ProductGrid } from '@/components/user/Product';
import { useState } from 'react';
import LayoutButton from '@/assets/icon/common/LayoutButton.svg?react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';

const SellerProfile = () => {
  const PRODUCT_LIST = [
    {
      productId: 0,
      title:
        '[프리따픽] VT 컬러 리들샷 마스크팩 2차 재진행 / 메종마르지엘라 이벤트까지',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤 너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-05-09T06:00:00Z',
      deadline: '2025-05-20T18:00:00Z',
      scrapped: false,
      soldOut: false,
    },
    {
      productId: 1,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      content:
        '🖤완판 재진행🖤 너무 예쁜 가디건🖤완판 재진행🖤너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-04-30T18:00:00Z',
      deadline: '2025-05-01T23:00:00Z',
      scrapped: true,
      soldOut: false,
    },
    {
      productId: 2,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      content:
        '🖤완판 재진행🖤 너무 예쁜 가디건🖤완판 재진행🖤너무 예쁜 가디건',
      thumbnail: '/img1.png',
      open: '2025-03-20T18:00:00Z',
      deadline: '2025-04-30T18:30:00Z',
      scrapped: true,
      soldOut: true,
    },
    {
      productId: 3,
      title: '소현X비비안웨스트우드 가디건 (색상 5가지)',
      name: '@dfkjdkfjdkfj',
      content: '🖤완판 재진행🖤',
      thumbnail: '/img1.png',
      open: '2025-04-20T18:00:00Z',
      deadline: '2025-05-08T18:30:00Z',
      scrapped: true,
      soldOut: false,
    },
  ];

  const [isGrid, setIsGrid] = useState<boolean>(true);
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInProgress(e.target.checked);
  };

  return (
    <>
      <span className="flex w-full justify-between px-5">
        <span className="flex cursor-pointer items-center gap-[.375rem]">
          <input
            type="checkbox"
            id="filterProductInProgress"
            hidden
            checked={inProgress}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="filterProductInProgress"
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
      {isGrid ? (
        <ul className="flex flex-wrap content-start items-start gap-x-[.6875rem] gap-y-5">
          {PRODUCT_LIST?.map((product) => (
            <ProductGrid key={product?.productId} product={product} />
          ))}
        </ul>
      ) : (
        <ul className="flex flex-col items-start gap-4 self-stretch">
          {PRODUCT_LIST?.map((product) => (
            <ProductList key={product?.productId} product={product} />
          ))}
        </ul>
      )}
    </>
  );
};

export default SellerProfile;
