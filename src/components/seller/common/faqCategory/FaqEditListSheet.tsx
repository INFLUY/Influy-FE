// 드래그 앤 드롭 바텀시트
import { CategoryType } from '@/types/common/CategoryType.types';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import DndIcon from '@/assets/icon/seller/DndIcon.svg?react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

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

// components/seller/faq/components/FaqEditListSheet.tsx
import { BottomSheet, AddButton } from '@/components';
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

type FaqEditListSheetProps = {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  onEdit: (id: number) => void;
  onRemove: (id: number) => void;
  onAddClick: () => void;
  onClose: () => void;
};

const FaqEditListSheet = ({
  categories,
  setCategories,
  onEdit,
  onRemove,
  onAddClick,
  onClose,
}: FaqEditListSheetProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = ({ active, over }: any) => {
    if (over && active.id !== over.id) {
      setCategories((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === active.id);
        const newIndex = prev.findIndex((c) => c.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <BottomSheet
      onClose={onClose}
      isBottomSheetOpen={true}
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
                  onEdit={onEdit}
                  onRemove={onRemove}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="mt-1 w-full px-5">
          <AddButton handleOnClick={onAddClick}>추가하기</AddButton>
        </div>
      </section>
    </BottomSheet>
  );
};

export default FaqEditListSheet;
