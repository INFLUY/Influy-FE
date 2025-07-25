import { ItemGrid } from '@/components/user/common/Item';
import { useState } from 'react';
import CheckBoxOff from '@/assets/icon/common/CheckBox16Off.svg?react';
import CheckBoxOn from '@/assets/icon/common/CheckBox16On.svg?react';
import { ItemPreviewList } from '@/types/common/ItemType.types';

const SelectionTab = () => {
  const PRODUCT_LIST: ItemPreviewList[] = [
    {
      itemId: 1,
      sellerId: 101,
      itemPeriod: 30,
      itemName: '빈티지 레코드 플레이어',
      sellerName: '레트로샵',
      startDate: '2025-07-01T00:00:00Z',
      endDate: '2025-07-31T23:59:59Z',
      tagline: '음악의 감성을 되살리다',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'INITIAL',
        waitingCnt: 2,
        completedCnt: 1,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 2,
      sellerId: 102,
      itemPeriod: 15,
      itemName: '디지털 액자',
      sellerName: '테크하우스',
      startDate: '2025-07-10T00:00:00Z',
      endDate: '2025-07-25T23:59:59Z',
      tagline: '추억을 담는 새로운 방법',
      currentStatus: 'EXTEND',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'OPENED',
        waitingCnt: 0,
        completedCnt: 5,
      },
      mainImg: '/img1.png',
    },
    {
      itemId: 3,
      sellerId: 103,
      itemPeriod: 10,
      itemName: '한정판 피규어',
      sellerName: '콜렉터즈존',
      tagline: '마니아를 위한 최고의 선택',
      currentStatus: 'DEFAULT',
      liked: false,
      talkBoxInfo: {
        talkBoxOpenStatus: 'CLOSED',
        waitingCnt: 3,
        completedCnt: 10,
      },
      mainImg: '/img1.png',
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
