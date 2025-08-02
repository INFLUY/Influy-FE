import { useState, useEffect } from 'react';
import BottomSheet from '@/components/common/BottomSheet';
import RadioInputSelector from '@/components/seller/common/RadioInputSelector';
import { DefaultButton } from '@/components/seller/common/Button';
import { RadioInputList } from '@/components/seller/common/RadioInput.types';
import LoadingSpinner from '@/components/common/LoadingSpinner';

type RadioBottomSheetProps = {
  title: string;
  description?: string;
  list: RadioInputList[];
  selected: string | undefined; // 부모에서 받은 현재 값
  onSave: (value: string) => void;
  closeModal: () => void;
};

const RadioBottomSheet = ({
  title,
  description,
  list,
  selected,
  onSave,
  closeModal,
}: RadioBottomSheetProps) => {
  if (selected === undefined) {
    return <LoadingSpinner />;
  }

  const [localSelected, setLocalSelected] = useState<string>(selected);

  useEffect(() => {
    setLocalSelected(selected);
  }, [selected]);

  const handleSave = () => {
    onSave(localSelected);
    closeModal();
  };

  return (
    <BottomSheet onClose={closeModal} isBottomSheetOpen>
      <div className="flex flex-col items-center">
        <span className="flex flex-col items-center gap-[.125rem]">
          <h1 className="subhead-b text-grey10 w-full text-center">{title}</h1>
          {description && (
            <p className="text-grey07 caption-m text-center">{description}</p>
          )}
        </span>

        <div className="scrollbar-hide flex w-full flex-col overflow-y-auto px-5 pb-8">
          <div className="flex w-full items-center py-4">
            <RadioInputSelector
              name={title}
              list={list}
              selected={localSelected}
              setSelected={setLocalSelected}
            />
          </div>
          <DefaultButton onClick={handleSave} text="저장하기" />
        </div>
      </div>
    </BottomSheet>
  );
};

export default RadioBottomSheet;
