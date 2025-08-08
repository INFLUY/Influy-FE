import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction, Suspense } from 'react';
import { DefaultButton, ToggleButton } from '@/components';
import { useState, useEffect } from 'react';
import { ItemAccessDTO } from '@/types/common/ItemType.types';

import { usePatchItemAccess } from '@/services/sellerItem/mutation/usePatchItemAccess';
import { useGetItemAccess } from '@/services/sellerItem/query/useGetItemAccess';
const VisibilityBottomSheet = ({
  isOpen,
  setIsOpen,
  itemId,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  itemId: number;
}) => {
  const [editedAccessState, setEditedAccessState] = useState<ItemAccessDTO>({
    archiveRecommended: false,
    searchAvailable: false,
  });

  const { mutate: patchItemAccess } = usePatchItemAccess();
  const handleSave = () => {
    if (!editedAccessState) return;

    patchItemAccess({
      itemId,
      data: editedAccessState,
    });
  };
  const { data: itemAccess } = useGetItemAccess({
    itemId,
  });

  useEffect(() => {
    if (!itemAccess) return;
    setEditedAccessState(itemAccess);
  }, [itemAccess]);

  return (
    <BottomSheet onClose={() => setIsOpen(false)} isBottomSheetOpen={isOpen}>
      <div className="flex flex-col items-center gap-[1.75rem]">
        {/* 상단 제목 */}
        <h2 className="subhead-b w-full text-center text-black">
          공개범위 설정
        </h2>

        <div className="divide-grey02 flex w-full flex-col divide-y px-5">
          {/* 홈아카이브 추천 허용 */}
          <div className="flex justify-between pb-4">
            <div className="flex flex-1 flex-col gap-1">
              <span className="body1-m text-black">홈 아카이브 추천 허용</span>
              <span className="body2-m text-grey07">
                홈 아카이브 추천 상품으로 게시될 수 있습니다.
              </span>
            </div>
            <Suspense fallback={null}>
              <ToggleButton
                name="공개범위 설정"
                isChecked={editedAccessState.archiveRecommended}
                setIsChecked={() =>
                  setEditedAccessState((prev) => ({
                    ...prev,
                    archiveRecommended: !prev.archiveRecommended,
                  }))
                }
              />
            </Suspense>
          </div>

          {/* 서비스 내 검색 허용 */}
          <div className="flex justify-between pt-5">
            <div className="flex flex-1 flex-col gap-1">
              <span className="body1-m text-black">서비스 내 검색 허용</span>
              <span className="body2-m text-grey07">
                검색 비허용 시 링크로만 접근할 수 있습니다.
              </span>
            </div>
            <Suspense fallback={null}>
              <ToggleButton
                name="서비스 내 검색 허용"
                isChecked={editedAccessState.searchAvailable}
                setIsChecked={() =>
                  setEditedAccessState((prev) => ({
                    ...prev,
                    searchAvailable: !prev.searchAvailable,
                  }))
                }
              />
            </Suspense>
          </div>
        </div>

        <div className="flex w-full flex-col px-5 pt-2.5 pb-8">
          <DefaultButton onClick={handleSave} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default VisibilityBottomSheet;
