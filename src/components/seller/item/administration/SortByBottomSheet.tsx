import BottomSheet from '@/components/common/BottomSheet';
import RadioInputSelector from '@/components/seller/common/RadioInputSelector';
import { SaveButton } from '@/components/seller/common/Button';
import { SetStateAction, useState } from 'react';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';

const SortByBottomSheet = ({
  list,
  isOpen,
  setIsOpen,
}: {
  list: RadioInputList[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [sortSelected, setSortSelected] = useState<number>(0);

  const handleClickSaveSortBy = () => {
    console.log(sortSelected);
    setIsOpen(false);
  };

  return (
    <BottomSheet onClose={() => setIsOpen(false)} isBottomSheetOpen={isOpen}>
      <div className="flex flex-col items-center">
        <span className="flex flex-col items-center gap-[.125rem]">
          <h1 className="subhead-b text-grey10 w-full text-center">정렬방식</h1>
          <p className="text-grey07 caption-m">
            설정한 정렬대로 유저에게 보여집니다.
          </p>
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
          <SaveButton onClick={handleClickSaveSortBy} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default SortByBottomSheet;
