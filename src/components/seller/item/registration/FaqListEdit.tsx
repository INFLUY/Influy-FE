import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import { CategoryType } from '@/types/common/CategoryType.types';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { CategoryChip, AddButton, TextInput } from '@/components';
import { SetStateAction, useState } from 'react';
import { BottomSheet, DefaultButton } from '@/components';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';

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

  const openListEditSheet = () => {
    setSheetMode('editList');
  };

  const closeSheet = () => setSheetMode('none');

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
    closeSheet();
  };

  const handleSaveTextEdit = () => {
    if (activeCategoryId === null) return;
    setCategories((prev) =>
      prev.map((c) =>
        c.id === activeCategoryId ? { ...c, category: draftName.trim() } : c
      )
    );
    closeSheet();
  };

  // const handleReorder = (newOrder: CategoryType[]) => {
  //   setCategories(newOrder);
  //   closeSheet();
  // };

  return (
    <>
      {categories.length == 0 ? (
        <NoCategory openAddSheet={openAddSheet} />
      ) : (
        <section className="box-border flex h-full w-full flex-col items-start justify-start gap-6">
          {/* 상단 */}
          <article className="flex w-full flex-col gap-2.5">
            {/* 제목칸 */}
            <div className="flex w-full items-center justify-between px-5">
              <h2 className="body1-b text-black">FAQ 카드</h2>
              <div className="flex cursor-pointer items-center gap-1">
                <span className="text-grey06 body2-m">카테고리 수정</span>
                <EditIcon className="h-3.5 w-3.5" />
              </div>
            </div>
            {/* 카테고리 선택칸 */}
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
        // <BottomSheet
        //   onClose={handleSaveAdd}
        //   isBottomSheetOpen={sheetMode === 'add'}
        // >
        //   <article className="mb-5 flex w-full flex-col gap-4">
        //     <div className="flex w-full flex-col gap-3">
        //       {/* 제목 */}
        //       <h2 className="subhead-b w-full text-center text-black">
        //         카테고리 추가
        //       </h2>
        //       {/* 입력칸 */}
        //       <div className="flex w-full items-center justify-between gap-[.9375rem] px-5">
        //         <TextInput
        //           text={draftName}
        //           setText={setDraftName}
        //           placeHolderContent="카테고리명을 입력해 주세요."
        //         />
        //         <MinusIcon className="h-5 w-5" />
        //       </div>
        //       {/* 저장하기 버튼 */}
        //       <div className="w-full px-5">
        //         <DefaultButton onClick={handleSaveAdd} disabled={!draftName} />
        //       </div>
        //     </div>
        //   </article>
        // </BottomSheet>
        <CategoryUpsertSheet
          handleSave={handleSaveAdd}
          isBottomSheetOpen={sheetMode == 'add'}
          draftName={draftName}
          setDraftName={setDraftName}
          onClose={() => setSheetMode('none')}
        />
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
}: {
  handleSave: () => void;
  isBottomSheetOpen: boolean;
  draftName: string;
  setDraftName: React.Dispatch<SetStateAction<string>>;
  onClose: () => void;
}) => {
  return (
    <BottomSheet onClose={onClose} isBottomSheetOpen={isBottomSheetOpen}>
      <article className="mb-5 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-3">
          {/* 제목 */}
          <h2 className="subhead-b w-full text-center text-black">
            카테고리 추가
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
            <DefaultButton onClick={handleSave} disabled={!draftName} />
          </div>
        </div>
      </article>
    </BottomSheet>
  );
};
