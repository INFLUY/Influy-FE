import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import { CategoryType } from '@/types/common/CategoryType.types';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { SetStateAction, useState, useRef } from 'react';
import {
  BottomSheet,
  DefaultButton,
  CategoryChip,
  AddButton,
  TextInput,
  SnackBar,
} from '@/components';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import DndIcon from '@/assets/icon/seller/DndIcon.svg?react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

type SheetMode = 'none' | 'add' | 'editText' | 'editList';

const FaqListEdit = ({ faqCategory }: { faqCategory: CategoryType[] }) => {
  // 1) 실제 카테고리 배열
  const [categories, setCategories] = useState<CategoryType[]>(faqCategory);

  // 2) 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState(0);

  // 3) 어떤 모드의 시트를 띄울지
  const [sheetMode, setSheetMode] = useState<SheetMode>('none');

  // 4) (수정 모드일 때) 수정 대상 카테고리 ID
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);

  // 4) BottomSheet 의 인풋에 바인딩할 임시 텍스트
  const [draftName, setDraftName] = useState('');

  //스낵바
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const [isDragging, setIsDragging] = useState(false);

  // --- UI 핸들러들 ---
  const openAddSheet = () => {
    setDraftName('');
    setActiveCategoryId(null);
    setSheetMode('add');
  };

  const openTextEditSheet = (id: number) => {
    const cat = categories.find((c) => c.id === id);
    setDraftName(cat?.category ?? '');
    setActiveCategoryId(id);
    setSheetMode('editText');
  };

  // --- CRUD 핸들러들 ---
  const handleSaveAdd = () => {
    if (!draftName.trim()) return;
    setCategories((prev) => [
      ...prev,
      {
        id: Math.max(0, ...prev.map((c) => c.id)) + 1,
        category: draftName.trim(),
      },
    ]);
    setSnackbar({
      open: true,
      message: '저장되었습니다',
    });
    setDraftName('');
    setSheetMode('editList');
  };

  const handleSaveTextEdit = () => {
    if (activeCategoryId === null) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCategoryId ? { ...c, category: draftName.trim() } : c
      )
    );
    setSnackbar({
      open: true,
      message: '저장되었습니다',
    });
    setDraftName('');
    setSheetMode('editList');
  };

  // 드래그 앤 드롭 센서
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setCategories((items) => {
        const oldIndex = items.findIndex((c) => c.id === active.id);
        const newIndex = items.findIndex((c) => c.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setIsDragging(false);
  };

  return (
    <>
      {categories.length == 0 ? (
        <NoCategory openAddSheet={openAddSheet} />
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
                  text={category.category}
                  isSelected={selectedCategory == category.id}
                  onToggle={() => setSelectedCategory(category.id)}
                  theme="faq"
                />
              ))}
            </div>
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
            <h2 className="subhead-b w-full text-center text-black">
              카테고리 수정
            </h2>

            {/* 카테고리 리스트 */}
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={categories.map((c) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="scrollbar-hide flex h-fit max-h-[23.3125rem] w-full flex-col gap-2 overflow-auto">
                  {categories.map((c) => (
                    <SortableCategoryItem
                      key={c.id}
                      id={c.id}
                      category={c}
                      onEdit={openTextEditSheet}
                      onRemove={(id) => {
                        setCategories((prev) =>
                          prev.filter((x) => x.id !== id)
                        );
                      }}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>

            {/* 카테고리 리스트 */}
            <div className="scrollbar-hide flex max-h-[23.3125rem] w-full flex-col gap-4 overflow-scroll">
              {/* {categories.map((data) => (
                <div className="flex w-full items-center justify-between px-5">
                  <MinusIcon className="mr-3 h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => openTextEditSheet(data.id)}
                    className="border-grey03 mr-1.5 flex flex-1 flex-col items-start rounded-xs border border-solid px-[.8125rem] py-2.5 text-black"
                  >
                    {data.category}
                  </button>
                  <DndIcon className="h-6 w-6" />
                </div>
              ))} */}
            </div>
            {/* 저장하기 버튼 */}
            <div className="w-full px-5">
              <AddButton handleOnClick={() => setSheetMode('add')}>
                추가하기
              </AddButton>
            </div>
          </section>
        </BottomSheet>
      )}
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
    </>
  );
};
export default FaqListEdit;

const NoCategory = ({ openAddSheet }: { openAddSheet: () => void }) => {
  return (
    <section className="box-border flex h-full w-full flex-col items-center justify-center gap-[1.375rem] px-5">
      {/* 폴더 이미지 및 카테고리 없음 */}
      <div className="flex flex-col items-center">
        <FolderIcon className="h-20 w-[5.6875rem]" />
        <span className="body1-sb mt-6 text-black">아직 카테고리가 없어요</span>
        <span className="caption-m text-grey07 mt-2 w-[16.8125rem] text-center">
          자주 묻는 질문, 재고/수량, 이벤트, 진행 일정, 배송 일정, 후기 모음,
          제작 과정 등의 카테고리를 추가해보세요.
        </span>
      </div>

      {/* 카테고리 추가하기 버튼 */}
      <AddButton handleOnClick={openAddSheet}>카테고리 추가하기</AddButton>
    </section>
  );
};

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
            <MinusIcon className="h-5 w-5" />
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

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

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
      <MinusIcon className="mr-3 h-5 w-5" onClick={() => onRemove(id)} />
      <button
        type="button"
        onClick={() => onEdit(id)}
        className="border-grey03 flex-1 rounded-xs border bg-white px-[.8125rem] py-2.5 text-left text-black"
      >
        {category.category}
      </button>
      <DndIcon {...listeners} {...attributes} className="h-6 w-6 cursor-grab" />
    </div>
  );
};
