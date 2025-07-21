import {
  ToggleButton,
  DefaultButton,
  CategoryChip,
  BottomSheet,
  AddButton,
} from '@/components';
import { useState, useRef } from 'react';
import {
  CategoryEditItem,
  CategoryUpsertSheet,
  SheetMode,
} from './CategoryItem';

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

export const CategorizeStep = ({ onFinish }: { onFinish: () => void }) => {
  const [sheetMode, setSheetMode] = useState<SheetMode>('none');
  const [draftName, setDraftName] = useState('');

  const onRemove = (id: number) => {};
  const onEdit = (id: number) => {};
  const onAdd = () => {};
  const onClose = () => {};

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4 px-5">
        <p className="b0dy2-m text-sub">
          원하는 분류기준이 있다면 자유롭게 수정해 주세요.
        </p>
        <div className="flex flex-wrap content-start items-start gap-[.6875rem_.625rem] self-stretch">
          <CategoryChip text="사이즈" theme="talkBox" />
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
          handleSave={onAdd}
          isBottomSheetOpen={sheetMode === 'editList'}
          draftName={draftName}
          setDraftName={setDraftName}
          onClose={onClose}
          onEdit={onEdit}
          mode={sheetMode}
          onRemove={onRemove}
          setSheetMode={setSheetMode}
        />
      )}
    </>
  );
};
