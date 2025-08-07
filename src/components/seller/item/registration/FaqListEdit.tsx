import { generatePath, useNavigate } from 'react-router-dom';
import { SetStateAction, useState, useRef, useEffect } from 'react';

import { CategoryType } from '@/types/common/CategoryType.types';
import { FaqQuestion } from '@/types/common/ItemType.types';

import { parseDateString } from '@/utils/formatDate';

import {
  BottomSheet,
  CategoryChip,
  AddButton,
  EmptyCategoryPlaceholder,
  LoadingSpinner,
  CategoryUpsertSheet,
  FaqEditListSheet,
} from '@/components';

import RightIcon from '@/assets/icon/common/ArrowRight10.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import KebobIcon from '@/assets/icon/common/KebabIcon.svg?react';
import DarkPinIcon from '@/assets/icon/common/DarkPinIcon.svg?react';

import {
  SELLER_ITEM_EDIT_FAQ_TAB_PATH,
  SELLER_ITEM_FAQ_EDIT_PATH,
  SELLER_ITEM_FAQ_REGISTER_PATH,
} from '@/utils/generatePath';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useGetItemFaqQuestionList } from '@/services/sellerFaqCard/query/useGetItemFaqQuestionList';
import { useStrictId } from '@/hooks/auth/useStrictId';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useDeleteFaqCard } from '@/services/sellerFaqCard/mutation/useDeleteFaqCard';
import { useModalStore } from '@/store/useModalStore';
import { usePatchFaqPin } from '@/services/sellerFaqCard/mutation/usePatchFaqPin';
import { SheetMode } from '@/types/common/FAQ.types';

import { useGetItemFaqCategoryQuery } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';

const FaqListEdit = ({
  faqCategory,
  itemId,
}: {
  faqCategory: CategoryType[];
  itemId: number;
}) => {
  const { sellerId } = useStrictId();

  // 1) 카테고리 배열
  const [categories, setCategories] = useState<CategoryType[]>(faqCategory);

  // 2) 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (faqCategory) {
      setCategories(faqCategory);
      setSelectedCategory(faqCategory[0]?.id);
    }
  }, [faqCategory]);

  // 3) 어떤 모드의 시트를 띄울지
  const [sheetMode, setSheetMode] = useState<SheetMode>('none');

  // 4) (수정 모드일 때) 수정 대상 카테고리 ID
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  // 5) BottomSheet 의 인풋에 바인딩할 임시 텍스트
  const [draftName, setDraftName] = useState('');

  const [selectedFaqQ, setSelectedFaqQ] = useState<FaqQuestion | null>(null);
  const navigate = useNavigate();

  // --- UI 핸들러 ---

  const openAddSheet = () => {
    setDraftName('');
    setActiveCategoryId(null);
    setSheetMode('add');
  };

  //api : faq 카테고리
  const { data: faqCategories, isFetching: isFaqCategoryFetching } =
    useGetItemFaqCategoryQuery({
      sellerId: Number(sellerId),
      itemId: Number(itemId),
    });

  // Faq 목록
  const {
    data: faqQuestions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetItemFaqQuestionList({
    size: 10,
    sellerId: sellerId,
    itemId: Number(itemId),
    faqCategoryId: selectedCategory,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useInfiniteScroll({
    targetRef: observerRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  const faqQuestionList = faqQuestions?.pages
    .flatMap((page) => page?.questionCardList ?? [])
    .filter(Boolean) as FaqQuestion[];

  const { mutate: patchPin } = usePatchFaqPin({
    faqCategoryId: selectedCategory!,
    onSuccessCallback: () => {
      setSheetMode('none');
    },
  });

  const { showSnackbar } = useSnackbarStore();

  const { mutate: deleteFaqCard } = useDeleteFaqCard(() => {
    navigate(generatePath(SELLER_ITEM_EDIT_FAQ_TAB_PATH, { itemId: itemId! }), {
      replace: true,
    });
    showSnackbar('FAQ가 삭제되었습니다.');
    setSheetMode('none');
  });

  const { showModal, hideModal } = useModalStore();

  const handleDeleteFaqClick = () => {
    if (!selectedFaqQ) return;
    showModal({
      text: `FAQ를 삭제하시겠습니까?\n한 번 삭제한 내용은 되돌릴 수 없습니다.`,
      leftButtonClick: () => {
        hideModal();
      },
      rightButtonClick: () =>
        deleteFaqCard({
          itemId,
          faqCardId: Number(selectedFaqQ.id),
          faqCategoryId: selectedCategory!,
        }),
    });
  };

  const handleFaqDelete = () => {
    handleDeleteFaqClick();
  };
  const handlePin = () => {
    if (!selectedFaqQ) return;
    patchPin({
      itemId,
      faqCardId: selectedFaqQ.id,
      isPinned: !selectedFaqQ.pinned,
    });
  };

  return (
    <>
      {categories.length === 0 ? (
        <EmptyCategoryPlaceholder openAddSheet={openAddSheet} />
      ) : (
        <section className="box-border flex h-full w-full flex-col items-start justify-start gap-6">
          {/* 상단 */}
          <article className="flex w-full flex-col gap-2.5">
            {/* 제목 및 카테고리 수정 */}
            <div className="flex w-full items-center justify-between px-5">
              <h2 className="body1-b text-black">FAQ 카드</h2>
              <button
                type="button"
                className="flex cursor-pointer items-center gap-1"
                onClick={() => setSheetMode('editList')}
              >
                <span className="text-grey06 body2-m">카테고리 수정</span>
                <EditIcon className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* 카테고리 칩 */}
            <div className="flex w-full flex-wrap gap-2 px-5">
              {categories.map((category: CategoryType) => (
                <CategoryChip
                  key={category.id}
                  text={category.name}
                  isSelected={selectedCategory === category.id}
                  onToggle={() => setSelectedCategory(category.id)}
                  theme="faq"
                />
              ))}
            </div>
          </article>

          {/* 질문 */}
          <article className="flex h-fit w-full flex-col gap-[.875rem] px-5">
            {faqQuestionList &&
              faqQuestionList.map((data) => (
                <FaqQuestionCard
                  faqCard={data}
                  itemId={itemId}
                  key={data.id}
                  setSheetMode={setSheetMode}
                  setSelectedFaqQ={setSelectedFaqQ}
                />
              ))}
            {hasNextPage && (
              <div ref={observerRef} className="h-4 w-full">
                {isFetchingNextPage && (
                  <div className="flex justify-center">
                    <LoadingSpinner />
                  </div>
                )}
              </div>
            )}
            <AddButton
              handleOnClick={() =>
                navigate(
                  generatePath(SELLER_ITEM_FAQ_REGISTER_PATH, { itemId })
                )
              }
            >
              FAQ 추가하기
            </AddButton>
          </article>

          {/* 중간 FAQ 리스트 */}
        </section>
      )}

      {/* 카테고리 추가하기 바텀시트 */}
      {sheetMode === 'add' && (
        <CategoryUpsertSheet
          mode="add"
          draftName={draftName}
          setDraftName={setDraftName}
          isBottomSheetOpen={true}
          setSheetMode={setSheetMode}
          itemId={Number(itemId)}
        />
      )}

      {/* 카테고리명 수정하기 바텀시트 */}
      {sheetMode === 'editText' && (
        <CategoryUpsertSheet
          mode="editText"
          draftName={draftName}
          setDraftName={setDraftName}
          isBottomSheetOpen={true}
          setSheetMode={setSheetMode}
          itemId={Number(itemId)}
          categoryId={activeCategoryId}
        />
      )}

      {/* 카테고리 및 카테고리 순서 수정 수정 */}
      {sheetMode === 'editList' && faqCategories && (
        <FaqEditListSheet
          mode="editList"
          setDraftName={setDraftName}
          setSheetMode={setSheetMode}
          itemId={Number(itemId)}
          categories={faqCategories}
          setActiveCategoryId={setActiveCategoryId}
          isFaqCategoryFetching={isFaqCategoryFetching}
        />
      )}

      {/* 단일 faq 케밥 클릭 */}
      {/* 질문 수정하기 바텀시트 */}
      {sheetMode === 'questionEdit' && (
        <BottomSheet
          onClose={() => setSheetMode('none')}
          isBottomSheetOpen={sheetMode === 'questionEdit'}
        >
          <div className="divide-grey02 flex flex-col items-center divide-y px-5 pb-4">
            <button
              type="button"
              className="body1-b w-full cursor-pointer py-4 text-center"
              onClick={handlePin}
            >
              {selectedFaqQ?.pinned ? '고정해제' : '맨 앞에 고정'}
            </button>
            <button
              type="button"
              className="body1-b w-full cursor-pointer py-4 text-center"
              onClick={() =>
                navigate(
                  generatePath(SELLER_ITEM_FAQ_EDIT_PATH, {
                    itemId,
                    faqId: selectedFaqQ?.id ?? 0,
                  })
                )
              }
            >
              수정
            </button>
            <button
              type="button"
              className="body1-b text-error w-full cursor-pointer py-4 text-center"
              onClick={handleFaqDelete}
            >
              삭제
            </button>
          </div>
        </BottomSheet>
      )}
    </>
  );
};
export default FaqListEdit;

type FaqQuestionCardProps = {
  faqCard: FaqQuestion;
  itemId: number;
  setSheetMode: React.Dispatch<SetStateAction<SheetMode>>;
  setSelectedFaqQ: React.Dispatch<SetStateAction<FaqQuestion | null>>;
};

const FaqQuestionCard = ({
  faqCard,
  itemId,
  setSheetMode,
  setSelectedFaqQ,
}: FaqQuestionCardProps) => {
  const navigate = useNavigate();
  const handleClickKebab = () => {
    setSelectedFaqQ(faqCard);
    setSheetMode('questionEdit');
  };

  return (
    <>
      <article className="border-grey04 bg-grey01 flex h-fit w-full shrink-0 flex-col items-start gap-3.5 rounded-[.1875rem] border border-solid px-3.5 pt-3 pb-2.5">
        <div className="flex items-start justify-between self-stretch">
          <span className="body2-m text-grey06">
            {parseDateString(faqCard.updatedAt)}
          </span>
          <div className="flex items-center justify-end gap-0.5">
            {faqCard.pinned && <DarkPinIcon className="h-5 w-5" />}
            <button
              type="button"
              className="cursor-pointer"
              onClick={handleClickKebab}
            >
              <KebobIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex w-full flex-col gap-1.5">
          <span className="body2-sb w-full text-black">
            {faqCard.questionContent}
          </span>
          <button
            type="button"
            className="text-grey09 flex cursor-pointer items-center justify-center gap-0.5 self-end"
            onClick={() => {
              navigate(
                generatePath(SELLER_ITEM_FAQ_EDIT_PATH, {
                  itemId,
                  faqId: faqCard.id,
                })
              );
            }}
          >
            <span className="body2-sb">수정하기</span>
            <RightIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </article>
    </>
  );
};
