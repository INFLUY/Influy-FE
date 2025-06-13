import {
  AddButton,
  DefaultButton,
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

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <XIcon
            className="text-grey10 h-6 w-6"
            onClick={() => navigate(-1)}
          />,
        ]}
        additionalStyles="border-none text-grey10"
      >
        카테고리 선택
      </PageHeader>
      {CATEGORIES.length === 0 ? (
        <>
          <main className="flex h-full flex-col justify-center gap-[1.375rem] px-5 py-[2.125rem]">
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
          </main>
        </>
      ) : (
        <>
          <div className="text-grey08 caption-m bg-grey01 flex w-full items-center justify-center px-[.625rem] py-2 text-center">
            등록할 FAQ의 카테고리를 1개 지정해 주세요.
          </div>
          <main className="flex h-full flex-col gap-4 px-5 py-[2.125rem]">
            <div className="flex w-full justify-between">
              <h2 className="body1-b text-black">FAQ 카테고리</h2>

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
          </main>
        </>
      )}
      <div className="px-5 pt-[.625rem] pb-4">
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
