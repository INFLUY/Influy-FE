// 드래그 앤 드롭 바텀시트
import { CategoryType } from '@/types/common/CategoryType.types';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import DndIcon from '@/assets/icon/seller/DndIcon.svg?react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { useState } from 'react';
import { usePatchFaqCategoryOrder } from '@/services/sellerFaqCard/mutation/usePatchFaqCategoryOrder';

type Props = {
  id: number;
  category: CategoryType;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
};

const SortableCategoryItem = ({ id, category, onEdit, onRemove }: Props) => {
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

import { BottomSheet, AddButton, DefaultButton } from '@/components';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  TouchSensor,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
  arrayMove,
} from '@dnd-kit/sortable';
import { SheetMode } from '@/types/common/FAQ.types';

type FaqEditListSheetProps = {
  categories: CategoryType[];
  itemId: number;
  setSheetMode: React.Dispatch<React.SetStateAction<SheetMode>>;
  mode: SheetMode;
  setDraftName: React.Dispatch<React.SetStateAction<string>>;
  setActiveCategoryId: React.Dispatch<React.SetStateAction<number | null>>;
  isFaqCategoryFetching: boolean;
};
import { useModalStore } from '@/store/useModalStore';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useDeleteFaqCategory } from '@/services/sellerFaqCard/mutation/useDeleteFaqCategory';
import { useEffect } from 'react';
const FaqEditListSheet = ({
  categories,
  itemId,
  setSheetMode,
  mode,
  setDraftName,
  setActiveCategoryId,
  isFaqCategoryFetching,
}: FaqEditListSheetProps) => {
  // dnd
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { showModal, hideModal } = useModalStore();
  const { showSnackbar } = useSnackbarStore();

  // 드레그할 때 이용하는 카테고리
  const [prevCategories, setPrevCategories] =
    useState<CategoryType[]>(categories);

  const [isDragMode, setIsDragMode] = useState(false);

  useEffect(() => {
    setPrevCategories(categories);
  }, [categories]);

  const handleDragEnd = ({ active, over }: any) => {
    if (over && active.id !== over.id) {
      setPrevCategories((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === active.id);
        const newIndex = prev.findIndex((c) => c.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const isSameCategoryList = (a: CategoryType[], b: CategoryType[]) => {
    if (a.length !== b.length) return false;
    return a.every((item, idx) => {
      const other = b[idx];
      return (
        item.id === other.id &&
        item.name === other.name &&
        item.categoryOrder === other.categoryOrder
      );
    });
  };

  useEffect(() => {
    setIsDragMode(!isSameCategoryList(prevCategories, categories));
  }, [prevCategories]);

  const { mutate: patchFaqCategoryOrder } = usePatchFaqCategoryOrder({
    itemId,
    onSuccessCallback: () => {
      showSnackbar('저장되었습니다.');
      setIsDragMode(false);
    },
  });

  const handleEditListComplete = () => {
    const idsList: number[] = prevCategories.map((c) => c.id);
    patchFaqCategoryOrder(idsList);
  };

  // 단일 카테고리 클릭
  const openTextEditSheet = (id: number) => {
    if (isDragMode)
      return showSnackbar('저장을 완료한 후에 삭제 및 수정이 가능합니다.');
    const cat = categories.find((c) => c.id === id);
    setDraftName(cat?.name ?? '');
    setActiveCategoryId(id);
    setSheetMode('editText');
  };

  // 카테고리 삭제 버튼 클릭
  const onRemoveCategory = (id: number) => {
    if (isDragMode)
      return showSnackbar('저장을 완료한 후에 삭제 및 수정이 가능합니다.');
    showModal({
      text: `해당 FAQ 카테고리를\n삭제하시겠습니까?`,
      description:
        '카테고리 안에 있는 모든 FAQ가 삭제되며\n복구할 수 없습니다.',
      leftButtonClick: () => {
        setSheetMode('editList');
        hideModal();
      },
      rightButtonClick: () => {
        handleDeleteConfirm(id);
      },
    });
  };
  const { mutate: deleteFaqCategory } = useDeleteFaqCategory({
    itemId,
    onSuccessCallback: () => {
      showSnackbar('삭제되었습니다.');
      setSheetMode('editList');
      hideModal();
    },
  });

  const handleDeleteConfirm = (id: number) => {
    deleteFaqCategory({ categoryId: id });
  };

  // 카테고리 추가 버튼 클릭
  const openAddSheet = () => {
    if (isDragMode)
      return showSnackbar('저장을 완료한 후에 삭제 및 수정이 가능합니다.');
    setDraftName('');
    setActiveCategoryId(null);
    setSheetMode('add');
  };

  const handleBottomSheetClose = () => {
    setPrevCategories(categories);
    setIsDragMode(false);
    setDraftName('');
    setActiveCategoryId(null);
    setSheetMode('none');
  };
  useEffect(() => {
    isFaqCategoryFetching;
  }, [isFaqCategoryFetching]);

  return (
    <BottomSheet
      onClose={handleBottomSheetClose}
      isBottomSheetOpen={mode === 'editList'}
      disableGesture={true}
    >
      <section className="mb-5 flex w-full flex-col gap-3">
        <div className="flex flex-col items-center gap-0.5">
          <h2 className="subhead-b w-full text-center text-black">
            카테고리 수정
          </h2>
          <span className="caption-m text-grey07 px-[2.75rem] text-center">
            Tip! 자주 묻는 질문, 재고/수량, 이벤트, 진행 일정 등을 추가해보세요.
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
            items={
              isDragMode
                ? prevCategories.map((c) => c.id)
                : categories.map((c) => c.id)
            }
            strategy={verticalListSortingStrategy}
          >
            <div className="scrollbar-hide flex h-fit max-h-[23.3125rem] w-full flex-col gap-4 overflow-auto">
              {(isDragMode || isFaqCategoryFetching
                ? prevCategories
                : categories
              ).map((c) => (
                <SortableCategoryItem
                  key={c.id}
                  id={c.id}
                  category={c}
                  onEdit={openTextEditSheet}
                  onRemove={() => onRemoveCategory(c.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="mt-1 w-full px-5">
          {isDragMode ? (
            <DefaultButton onClick={handleEditListComplete} />
          ) : (
            <AddButton handleOnClick={openAddSheet}>추가하기</AddButton>
          )}
        </div>
      </section>
    </BottomSheet>
  );
};

export default FaqEditListSheet;
