// 카테고리 추가/수정 바텀시트
import { SetStateAction, useRef } from 'react';
import { BottomSheet, DefaultButton, TextInput } from '@/components';
import { useSnackbarStore } from '@/store/snackbarStore';

import { usePostItemFaqCategory } from '@/services/sellerFaqCard/mutation/usePostItemFaqCategory';
import { usePatchFaqCategory } from '@/services/sellerFaqCard/mutation/usePatchFaqCategory';
import { SheetMode } from '@/types/common/FAQ.types';

type Props = {
  isBottomSheetOpen: boolean;
  draftName: string;
  setDraftName: React.Dispatch<SetStateAction<string>>;
  mode: 'add' | 'editText';
  setSheetMode: React.Dispatch<SetStateAction<SheetMode>>;
  itemId: number;
  categoryId?: number | null;
};

const CategoryUpsertSheet = ({
  isBottomSheetOpen,
  draftName,
  setDraftName,
  mode,
  itemId,
  setSheetMode,
  categoryId,
}: Props) => {
  const initialValueRef = useRef<string>(draftName);
  const { showSnackbar } = useSnackbarStore();

  const { mutate: postFaqCategory } = usePostItemFaqCategory({
    itemId,
    onSuccessCallback: () => {
      showSnackbar('저장되었습니다');
      setDraftName('');
      setSheetMode('editList');
    },
  });

  const { mutate: patchFaqCategory } = usePatchFaqCategory({
    itemId,
    onSuccessCallback: () => {
      showSnackbar('저장되었습니다');
      setDraftName('');
      setSheetMode('editList');
    },
  });

  const handleSave = () => {
    if (!draftName.trim()) return;

    if (mode === 'add') postFaqCategory({ category: draftName.trim() });
    if (mode === 'editText' && categoryId)
      patchFaqCategory({ id: categoryId, category: draftName.trim() });
  };

  return (
    <BottomSheet
      onClose={() => {
        setSheetMode('editList');
        setDraftName('');
      }}
      isBottomSheetOpen={isBottomSheetOpen}
    >
      <article className="mb-5 flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-3">
          <h2 className="subhead-b w-full text-center text-black">
            {mode === 'add' ? '카테고리 추가' : '카테고리명 수정'}
          </h2>
          <div className="flex w-full items-center justify-between gap-[.9375rem] px-5">
            <TextInput
              text={draftName}
              setText={setDraftName}
              placeHolderContent="카테고리명을 입력해 주세요."
            />
          </div>
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

export default CategoryUpsertSheet;
