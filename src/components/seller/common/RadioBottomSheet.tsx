import BottomSheet from '@/components/common/BottomSheet';
import RadioInputSelector from '@/components/seller/common/RadioInputSelector';
import { DefaultButton } from '@/components/seller/common/Button';
import { useState } from 'react';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';

const RadioBottomSheet = ({
  title,
  itemId,
  description,
  list,
  closeModal,
}: {
  title: string;
  itemId?: number;
  description?: string;
  list: RadioInputList[];
  closeModal: () => void;
}) => {
  const [sortSelected, setSortSelected] = useState<number>(0);

  const handleClickSaveSortBy = () => {
    console.log(sortSelected, itemId); // TODO: 백 연동
    closeModal();
  };

  return (
    <BottomSheet onClose={closeModal} isBottomSheetOpen>
      <div className="flex flex-col items-center">
        <span className="flex flex-col items-center gap-[.125rem]">
          <h1 className="subhead-b text-grey10 w-full text-center">{title}</h1>
          {description && (
            <p className="text-grey07 caption-m">{description}</p>
          )}
        </span>
        <div className="scrollbar-hide flex w-full flex-col overflow-y-auto px-5 pb-8">
          <div className="flex w-full items-center py-4">
            <RadioInputSelector
              name="sort"
              list={list}
              selected={sortSelected}
              setSelected={setSortSelected}
            />
          </div>
          <DefaultButton onClick={handleClickSaveSortBy} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default RadioBottomSheet;
