import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';
import { BottomSheet, DefaultButton, TextInput, AddButton } from '@/components';
import { SetStateAction, useRef } from 'react';

export const CategoryEditItem = ({
  id,
  text,
  onRemove,
  onEdit,
}: {
  id: number;
  text: string;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}) => {
  return (
    <article className="flex w-full items-center justify-between px-5">
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
        {text}
      </button>
    </article>
  );
};

export type SheetMode = 'none' | 'add' | 'editList' | 'editText' | 'delete';
import { QuestionCategory } from '@/types/seller/TalkBox.types';

export const CategoryUpsertSheet = ({
  handleSave,
  isBottomSheetOpen,
  draftName,
  setDraftName,
  onClose,
  mode,
  onRemove,
  onSingleCategoryEdit,
  setSheetMode,
  category,
}: {
  handleSave: () => void;
  isBottomSheetOpen: boolean;
  draftName: string;
  setDraftName: React.Dispatch<SetStateAction<string>>;
  setSheetMode: React.Dispatch<SetStateAction<SheetMode>>;
  onClose: () => void;
  onRemove: (id: number) => void;
  onSingleCategoryEdit: (id: number) => void;
  category: QuestionCategory[];
  mode: SheetMode;
}) => {
  // 시트가 열릴 때의 initial value 를 기억할 ref
  const initialValueRef = useRef<string>(draftName);

  return (
    <BottomSheet onClose={onClose} isBottomSheetOpen={isBottomSheetOpen}>
      <section className="mb-5 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-3">
          <div className="flex flex-col items-center gap-0.5">
            {/* 제목 */}
            <h2 className="subhead-b w-full text-center text-black">
              {mode === 'add'
                ? '질문 카테고리 추가'
                : mode === 'editText'
                  ? '질문 카테고리명 수정'
                  : '질문 카테고리 수정'}
            </h2>
            {(mode === 'editList' || mode === 'delete') && (
              <span className="caption-m text-grey07 px-[2.75rem] text-center">
                Tip! 자주 받을 질문을 미리 카테고리로 설정해보세요. AI가 자동
                분류해드려요.
              </span>
            )}
          </div>

          {/* 카테고리 추가 및 단일 카테고리 수정  */}
          {(mode === 'add' || mode === 'editText') && (
            <>
              <div className="flex w-full items-center justify-between gap-[.9375rem] px-5">
                {/* 입력칸 */}
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
            </>
          )}

          {/* 질문 카테고리 수정 페이지 */}
          {(mode === 'editList' || mode === 'delete') && (
            <>
              <section className="scrollbar-hide flex h-fit max-h-[23.3125rem] w-full flex-col gap-4 overflow-auto">
                {category.map((c) => (
                  <CategoryEditItem
                    id={c.id}
                    onRemove={onRemove}
                    onEdit={onSingleCategoryEdit}
                    text={c.questionCategory}
                  />
                ))}
              </section>

              {/* 저장하기 버튼 */}
              <div className="mt-1 w-full px-5">
                <AddButton handleOnClick={() => setSheetMode('add')}>
                  추가하기
                </AddButton>
              </div>
            </>
          )}
        </div>
      </section>
    </BottomSheet>
  );
};
