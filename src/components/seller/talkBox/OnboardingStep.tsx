import {
  ToggleButton,
  DefaultButton,
  CategoryChip,
  BottomSheet,
  AddButton,
} from '@/components';
import { useState } from 'react';
import MinusIcon from '@/assets/icon/common/MinusIcon.svg?react';

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

type SheetMode = 'none' | 'add' | 'edit';

export const CategorizeStep = ({ onFinish }: { onFinish: () => void }) => {
  const [sheetMode, setSheetMode] = useState<SheetMode>('none');

  const onRemove = (id: number) => {};
  const onEdit = (id: number) => {};
  const onAdd = () => {};

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
          onClick={() => setSheetMode('edit')}
          activeTheme="white"
        />
        <DefaultButton text="설정 완료" onClick={onFinish} />
      </div>

      {/* 바텀시트 */}
      {sheetMode === 'edit' && (
        <BottomSheet
          onClose={() => setSheetMode('none')}
          isBottomSheetOpen={sheetMode === 'edit'}
        >
          <section className="mb-5 flex w-full flex-col gap-3">
            {/* 제목 */}
            <div className="flex flex-col items-center gap-0.5">
              <h2 className="subhead-b w-full text-center text-black">
                질문 카테고리 수정
              </h2>
              <span className="caption-m text-grey07 px-[2.75rem] text-center">
                Tip! 자주 받을 질문을 미리 카테고리로 설정해보세요. AI가 자동
                분류해드려요.
              </span>
            </div>

            <section className="scrollbar-hide flex h-fit max-h-[23.3125rem] w-full flex-col gap-4 overflow-auto">
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
                  재입고
                </button>
              </article>
            </section>

            {/* 저장하기 버튼 */}
            <div className="mt-1 w-full px-5">
              <AddButton handleOnClick={() => setSheetMode('add')}>
                추가하기
              </AddButton>
            </div>
          </section>
        </BottomSheet>
      )}
    </>
  );
};
