import {
  SaveButton,
  DefaultButton,
  LimitedTextInput,
  TipTooltip,
  CategoryMultiSelector,
} from '@/components';

import { useState } from 'react';

export const ItemRegistrationPage = () => {
  const [titleText, setTitleText] = useState('');
  const handleSaveClick = () => {};
  return (
    <div className="box-border flex flex-col gap-y-10 px-5">
      <SaveButton onClick={handleSaveClick} />
      <div className="flex h-[5.5rem] w-[23.4375rem] shrink-0 items-center justify-center gap-[.4375rem] px-5 pt-[.4375rem] pb-8 [background:var(--Grey01,#F8F8F9)]">
        <DefaultButton
          onClick={handleSaveClick}
          disabled={false}
          activeColor="bg-red-300"
        />
        <DefaultButton onClick={handleSaveClick} />
      </div>
      <LimitedTextInput
        text={titleText}
        setText={setTitleText}
        maxLength={45}
        placeHolderContent="상품의 이름을 입력해 주세요."
      />
      <TipTooltip text={'최대 3가지 카테고리를 선택할 수 있습니다!'} />
      <CategoryMultiSelector />
    </div>
  );
};
