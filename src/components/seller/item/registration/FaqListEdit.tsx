import { generatePath, useNavigate } from 'react-router-dom';
import { SetStateAction, useState, useRef, useEffect } from 'react';

import { CategoryType } from '@/types/common/CategoryType.types';
import { FaqQuestion } from '@/types/common/ItemType.types';

import { parseDateString } from '@/utils/formatDate';

import {
  BottomSheet,
  DefaultButton,
  CategoryChip,
  AddButton,
  TextInput,
  EmptyCategoryPlaceholder,
  SellerModal,
  LoadingSpinner,
} from '@/components';

import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import DndIcon from '@/assets/icon/seller/DndIcon.svg?react';
import RightIcon from '@/assets/icon/common/ArrowRight10.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import KebobIcon from '@/assets/icon/common/KebabIcon.svg?react';
import DarkPinIcon from '@/assets/icon/common/DarkPinIcon.svg?react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SELLER_ITEM_EDIT_FAQ_TAB_PATH,
  SELLER_ITEM_FAQ_EDIT_PATH,
  SELLER_ITEM_FAQ_REGISTER_PATH,
} from '@/utils/generatePath';
import { useSnackbarStore } from '@/store/snackbarStore';
import { usePostItemFaqCategory } from '@/services/sellerFaqCard/mutation/usePostItemFaqCategory';
import { useGetItemFaqQuestionList } from '@/services/sellerFaqCard/query/useGetItemFaqQuestionList';
import { useStrictId } from '@/hooks/auth/useStrictId';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useDeleteFaqCard } from '@/services/sellerFaqCard/mutation/useDeleteFaqCard';
import { useModalStore } from '@/store/useModalStore';
import { usePatchFaqPin } from '@/services/sellerFaqCard/mutation/usePatchFaqPin';

type SheetMode =
  | 'none'
  | 'add'
  | 'editText'
  | 'editList'
  | 'questionEdit'
  | 'delete';

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

  // 4) BottomSheet 의 인풋에 바인딩할 임시 텍스트
  const [draftName, setDraftName] = useState('');

  const { showSnackbar } = useSnackbarStore();

  // 삭제할 카테고리
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);

  const navigate = useNavigate();

  const { mutate: postFaqCategory } = usePostItemFaqCategory({
    itemId,
    onSuccessCallback: (response: CategoryType) => {
      setCategories((prev) => [
        ...prev,
        {
          id: response.id,
          name: response.name,
        },
      ]);
      showSnackbar('저장되었습니다');
      setDraftName('');
      setSheetMode('editList');
    },
  });

  // --- UI 핸들러 ---
  const openAddSheet = () => {
    setDraftName('');
    setActiveCategoryId(null);
    setSheetMode('add');
  };

  const openTextEditSheet = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    setDraftName(cat?.name ?? '');
    setActiveCategoryId(id);
    setSheetMode('editText');
  };

  // --- CRUD 핸들러들 ---
  const handleSaveAdd = () => {
    if (!draftName.trim()) return;
    postFaqCategory({ category: draftName.trim() });
  };

  const handleSaveTextEdit = () => {
    if (activeCategoryId === null) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCategoryId ? { ...c, category: draftName.trim() } : c
      )
    );
    showSnackbar('저장되었습니다');
    setDraftName('');
    setSheetMode('editList');
  };

  // 드래그 앤 드롭 센서
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((c) => c.id === active.id);
        const newIndex = items.findIndex((c) => c.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const onRemoveCategory = (id: number) => {
    setCategoryToDelete(id);
    setSheetMode('delete');
  };

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
                  faqCategoryId={selectedCategory!}
                  itemId={itemId}
                  key={data.id}
                  sheetMode={sheetMode}
                  setSheetMode={setSheetMode}
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
          handleSave={handleSaveAdd}
          isBottomSheetOpen={sheetMode == 'add'}
          draftName={draftName}
          setDraftName={setDraftName}
          onClose={() => {
            setSheetMode('editList');
            setDraftName('');
          }}
          mode="add"
        />
      )}

      {/* 카테고리명 수정하기 바텀시트 */}
      {sheetMode === 'editText' && (
        <CategoryUpsertSheet
          handleSave={handleSaveTextEdit}
          isBottomSheetOpen={sheetMode == 'editText'}
          draftName={draftName}
          setDraftName={setDraftName}
          onClose={() => {
            setSheetMode('editList');
            setDraftName('');
          }}
          mode="editText"
        />
      )}

      {/* 카테고리 수정 */}
      {sheetMode === 'editList' && (
        <BottomSheet
          onClose={() => setSheetMode('none')}
          isBottomSheetOpen={sheetMode === 'editList'}
          disableGesture={true}
        >
          <section className="mb-5 flex w-full flex-col gap-3">
            {/* 제목 */}
            <div className="flex flex-col items-center gap-0.5">
              <h2 className="subhead-b w-full text-center text-black">
                카테고리 수정
              </h2>
              <span className="caption-m text-grey07 px-[2.75rem] text-center">
                Tip! 자주 묻는 질문, 재고/수량, 이벤트, 진행 일정, 배송 일정,
                후기 모음, 제작 과정 등의 카테고리를 추가해보세요.
              </span>
            </div>

            {/* 카테고리 리스트 */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="scrollbar-hide flex h-fit max-h-[23.3125rem] w-full flex-col gap-4 overflow-auto">
                  {categories.map((c) => (
                    <SortableCategoryItem
                      key={c.id}
                      id={c.id}
                      category={c}
                      onEdit={openTextEditSheet}
                      onRemove={onRemoveCategory}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* 저장하기 버튼 */}
            <div className="mt-1 w-full px-5">
              <AddButton handleOnClick={() => setSheetMode('add')}>
                추가하기
              </AddButton>
            </div>
          </section>
        </BottomSheet>
      )}

      {sheetMode === 'delete' && categoryToDelete !== null && (
        <SellerModal
          text="해당 FAQ 카테고리를 삭제하시겠습니까?"
          description="카테고리 안에 있는 모든 FAQ가 삭제되며 복구할 수 없습니다."
          onClose={() => {
            setSheetMode('editList');
            setCategoryToDelete(null);
          }}
          rightButtonClick={() => {
            setCategories((prev) =>
              prev.filter((cat) => cat.id !== categoryToDelete)
            );
            showSnackbar('삭제되었습니다');
            setSheetMode('none');
            setCategoryToDelete(null);
          }}
          setIsModalOpen={() => {
            setSheetMode('editList');
            setCategoryToDelete(null);
          }}
        />
      )}
    </>
  );
};
export default FaqListEdit;

const CategoryUpsertSheet = ({
  handleSave,
  isBottomSheetOpen,
  draftName,
  setDraftName,
  onClose,
  mode,
}: {
  handleSave: () => void;
  isBottomSheetOpen: boolean;
  draftName: string;
  setDraftName: React.Dispatch<SetStateAction<string>>;
  onClose: () => void;
  mode: 'add' | 'editText';
}) => {
  // 시트가 열릴 때의 initial value 를 기억할 ref
  const initialValueRef = useRef<string>(draftName);

  return (
    <BottomSheet onClose={onClose} isBottomSheetOpen={isBottomSheetOpen}>
      <article className="mb-5 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-3">
          {/* 제목 */}
          <h2 className="subhead-b w-full text-center text-black">
            {mode === 'add' ? '카테고리 추가' : '카테고리명 수정'}
          </h2>
          {/* 입력칸 */}
          <div className="flex w-full items-center justify-between gap-[.9375rem] px-5">
            <TextInput
              text={draftName}
              setText={setDraftName}
              placeHolderContent="카테고리명을 입력해 주세요."
            />
          </div>
          {/* 저장하기 버튼 */}
          <div className="w-full px-5">
            <DefaultButton
              onClick={handleSave}
              disabled={!draftName || initialValueRef.current === draftName}
            />
          </div>
        </div>
      </article>
    </BottomSheet>
  );
};

type SortableCategoryItemProps = {
  id: number;
  category: CategoryType;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const SortableCategoryItem = ({
  id,
  category,
  onEdit,
  onRemove,
}: SortableCategoryItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex w-full items-center justify-between px-5"
    >
      <button
        className="cursor-pointer"
        type="button"
        onClick={() => onRemove(id)}
      >
        <MinusIcon className="mr-3 h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => onEdit(id)}
        className="border-grey03 body2-m flex-1 rounded-xs border bg-white px-[.8125rem] py-2.5 text-left text-black"
      >
        {category.name}
      </button>
      <DndIcon {...listeners} {...attributes} className="h-6 w-6 cursor-grab" />
    </div>
  );
};

type FaqQuestionCardProps = {
  faqCard: FaqQuestion;
  faqCategoryId: number;
  itemId: number;
  sheetMode: SheetMode;
  setSheetMode: React.Dispatch<SetStateAction<SheetMode>>;
};

const FaqQuestionCard = ({
  faqCard,
  faqCategoryId,
  itemId,
  sheetMode,
  setSheetMode,
}: FaqQuestionCardProps) => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();

  const { mutate: patchPin } = usePatchFaqPin({
    faqCategoryId,
    onSuccessCallback: () => {
      setSheetMode('none');
    },
  });

  const handlePin = () => {
    patchPin({ itemId, faqCardId: faqCard.id, isPinned: !faqCard.pinned });
  };

  const { mutate: deleteFaqCard } = useDeleteFaqCard(() => {
    navigate(generatePath(SELLER_ITEM_EDIT_FAQ_TAB_PATH, { itemId: itemId! }), {
      replace: true,
    });
    showSnackbar('FAQ가 삭제되었습니다.');
    setSheetMode('none');
  });

  const { showModal, hideModal } = useModalStore();

  const handleDeleteFaqClick = () => {
    showModal({
      text: `FAQ를 삭제하시겠습니까?\n한 번 삭제한 내용은 되돌릴 수 없습니다.`,
      leftButtonClick: () => {
        hideModal();
      },
      rightButtonClick: () =>
        deleteFaqCard({
          itemId,
          faqCardId: Number(faqCard.id),
          faqCategoryId,
        }),
    });
  };

  const handleFaqDelete = () => {
    handleDeleteFaqClick();
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
              onClick={() => setSheetMode('questionEdit')}
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
              {faqCard.pinned ? '고정해제' : '맨 앞에 고정'}
            </button>
            <button
              type="button"
              className="body1-b w-full cursor-pointer py-4 text-center"
              onClick={() =>
                navigate(
                  generatePath(SELLER_ITEM_FAQ_EDIT_PATH, {
                    itemId,
                    faqID: faqCard.id,
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
