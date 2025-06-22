import {
  AddButton,
  DefaultButton,
  ItemBanner,
  PageHeader,
  TipTooltip,
  VanillaCategoryMultiSelector,
} from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import EditIcon from '@/assets/icon/common/EditIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CategoryType } from '@/types/common/CategoryType.types';

const FaqRegistrationCategoryPage = () => {
  const navigate = useNavigate();

  const CATEGORIES: CategoryType[] = [
    { id: 1, category: '색상' },
    { id: 2, category: '구성' },
    { id: 3, category: '디테일' },
    { id: 4, category: '사이즈' },
    { id: 5, category: '가격' },
    { id: 6, category: '진행일정' },
    { id: 7, category: '재고/수량' },
  ];
  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);

  const itemData = {
    itemImgList: ['xxx.png', 'xxxxx.png', 'xxxxxx.png'],
    name: '제작 원피스',
    itemCategoryList: ['뷰티', '패션'],
    startDate: '2025-06-22T08:57:56.040Z',
    endDate: '2025-06-22T08:57:56.040Z',
    tagline: '빤짝거리는 원피스입니다',
    regularPrice: 100000,
    salePrice: 80000,
    marketLink: 'xxxx.com',
    itemPeriod: 1,
    comment: '이렇게 빤짝이는 드레스 흔하지 않아요 어렵게 구해왔어요',
    isArchived: false,
  };

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <XIcon
            className="text-grey10 h-6 w-6"
            onClick={() => navigate(-1)}
          />,
        ]}
        additionalStyles="text-grey10"
      >
        카테고리 선택
      </PageHeader>
      {CATEGORIES.length === 0 ? (
        <section className="flex h-full flex-1 flex-col justify-center gap-[1.375rem] px-5 py-[2.125rem]">
          <div className="flex flex-col items-center gap-6">
            <FolderIcon />
            <span className="body1-sb">아직 카테고리가 없어요</span>
          </div>
          <TipTooltip
            text={`자주 들어오는 질문들을 카테고리로 설정하면 좋아요.\nex) 자주 묻는 질문, 가격/구성, 진행일정, 이벤트, 재고/수량`}
            bgColor="bg-grey01"
            tipColor="text-black"
            textColor="text-grey08"
          />
          <AddButton handleOnClick={() => navigate('')}>
            카테고리 추가하기
          </AddButton>
        </section>
      ) : (
        <div className="flex flex-1 flex-col gap-6 px-5">
          <ItemBanner name={itemData?.name} tagline={itemData?.tagline} />
          <section className="flex h-full flex-col gap-4">
            <div className="flex w-full justify-between">
              <h2 className="body1-b text-black">
                FAQ 카테고리 <span className="text-[#F43232]">*</span>
              </h2>

              {/* 카테고리 수정 버튼 */}
              <button
                type="button"
                className="text-grey06 body2-m flex cursor-pointer items-center gap-1"
              >
                카테고리 수정
                <EditIcon />
              </button>
            </div>

            {/* FAQ 카테고리 */}
            <VanillaCategoryMultiSelector
              categoryList={CATEGORIES}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </section>
        </div>
      )}
      <div className="sticky bottom-0 bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          text="다음"
          disabled={selectedCategory.length === 0}
          onClick={() => console.log(...selectedCategory)}
        />
      </div>
    </div>
  );
};

export default FaqRegistrationCategoryPage;
