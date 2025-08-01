import {
  ToggleButton,
  DefaultButton,
  CategoryChip,
  SellerModal,
} from '@/components';
import { useState } from 'react';
import { CategoryUpsertSheet, SheetMode } from './CategoryItem';
import { useSnackbarStore } from '@/store/snackbarStore';

export const ActivateStep = ({ onNext }: { onNext: () => void }) => {
  const [isActivated, setIsActivated] = useState(false);

  return (
    <>
      <div className="flex w-full flex-col gap-1.5 px-5">
        <div className="bg-grey02 flex items-start justify-between rounded-[.1875rem] px-3.5 py-5">
          <label className="body1-sb text-grey11">톡박스 활성화</label>
          <ToggleButton
            isChecked={isActivated}
            setIsChecked={setIsActivated}
            name="톡박스 활성화"
          />
        </div>
        <p className="text-grey07 body2-m">
          비활성화 상태에서는 사용자들이 질문을 남길 수 없고 답변 또한 전송
          불가합니다.
        </p>
      </div>
      <div className="absolute bottom-0 w-full bg-white px-5 py-2">
        <DefaultButton text="다음" onClick={onNext} disabled={!isActivated} />
      </div>
    </>
  );
};

export const CategorizeStep = ({
  onFinish,
  category,
  setCategory,
}: {
  onFinish: () => void;
  category: string[];
  setCategory: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const [sheetMode, setSheetMode] = useState<SheetMode>('none');

  const [draftName, setDraftName] = useState('');
  const [editTarget, setEditTarget] = useState<string | null>(null);

  const { showSnackbar } = useSnackbarStore();

  // 삭제할 카테고리
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  const onRemove = (categoryName: string) => {
    if (categoryName === '기타') {
      showSnackbar('‘기타’ 카테고리는 수정 및 삭제가 불가능합니다.');
      return;
    }
    setCategoryToDelete(categoryName);
    setSheetMode('delete');
  };

  const onConfirmDelete = () => {
    setCategory(category.filter((c) => c !== categoryToDelete));
    showSnackbar('삭제되었습니다.');
    setCategoryToDelete(null);
    setSheetMode('none');
  };

  const onSingleCategoryEdit = (categoryName: string) => {
    if (categoryName === '기타') {
      showSnackbar('‘기타’ 카테고리는 수정 및 삭제가 불가능합니다.');
      return;
    }
    setEditTarget(categoryName);
    setDraftName(categoryName);
    setSheetMode('editText');
  };

  const handleSave = () => {
    const trimmed = draftName.trim();

    if (!trimmed) return;
    if (category.includes(trimmed)) {
      showSnackbar('이미 존재하는 카테고리입니다.');
      return;
    }
    if (sheetMode === 'add') {
      setCategory((prev) => {
        const withoutEtc = prev.filter((c) => c !== '기타');
        return [
          ...withoutEtc,
          trimmed,
          ...(prev.includes('기타') ? ['기타'] : []),
        ];
      });
      setDraftName('');
      setSheetMode('editList');
    } else if (sheetMode === 'editText' && editTarget !== null) {
      if (editTarget === trimmed) {
        setSheetMode('editList');
        return;
      }
      setCategory((prev) => prev.map((c) => (c === editTarget ? trimmed : c)));
      setDraftName('');
      setEditTarget(null);
      setSheetMode('editList');
    }
    showSnackbar('저장되었습니다.');
  };

  const onClose = () => {
    if (sheetMode === 'editList') setSheetMode('none');
    else if (sheetMode === 'editText' || sheetMode === 'add') {
      setDraftName('');
      setEditTarget(null);
      setSheetMode('editList');
    }
  };

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 px-5">
        <p className="body2-m text-sub">
          원하는 분류기준이 있다면 자유롭게 수정해 주세요.
        </p>
        <div className="flex flex-wrap content-start items-start gap-[.6875rem_.625rem] self-stretch">
          {category.map((category) => (
            <CategoryChip text={category} theme="talkBox" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 flex w-full flex-col gap-3 bg-white px-5 py-2">
        <DefaultButton
          text="수정하기"
          onClick={() => setSheetMode('editList')}
          activeTheme="white"
        />
        <DefaultButton text="설정 완료" onClick={onFinish} />
      </div>

      {/* 바텀시트 */}
      {sheetMode !== 'none' && (
        <CategoryUpsertSheet
          handleSave={handleSave}
          isBottomSheetOpen={sheetMode === 'editList'}
          draftName={draftName}
          setDraftName={setDraftName}
          onClose={onClose}
          onSingleCategoryEdit={onSingleCategoryEdit}
          mode={sheetMode}
          onRemove={onRemove}
          setSheetMode={setSheetMode}
          category={category}
          editTarget={editTarget}
        />
      )}
      {sheetMode === 'delete' && categoryToDelete !== null && (
        <SellerModal
          text="해당 FAQ 카테고리를 삭제하시겠습니까?"
          description="카테고리 안에 있는 모든 FAQ가 삭제되며 복구할 수 없습니다."
          onClose={() => {
            setSheetMode('editList');
            setCategoryToDelete(null);
          }}
          rightButtonClick={onConfirmDelete}
          setIsModalOpen={() => {
            setSheetMode('editList');
            setCategoryToDelete(null);
          }}
        />
      )}
    </>
  );
};
