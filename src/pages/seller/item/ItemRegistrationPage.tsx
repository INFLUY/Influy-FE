import {
  SaveButton,
  DefaultButton,
  LimitedTextInput,
  TipTooltip,
  CategoryMultiSelector,
  LinkInput,
  CategoryChip,
  WideTextArea,
} from '@/components';

import { useState } from 'react';

export const ItemRegistrationPage = () => {
  const [titleText, setTitleText] = useState('');
  const [linkText, setLinkText] = useState('');
  const [commentText, setCommentText] = useState('');

  const [selectedCategoryList, setSelectedCategoryList] = useState<string[]>(
    []
  );

  const handleSaveClick = () => {};

  return (
    <div className="box-border flex flex-col gap-y-10 px-5">
      <CategoryChip text={'뷰티'} />
      <SaveButton onClick={handleSaveClick} />
      <div className="bg-grey01 flex h-[5.5rem] w-full shrink-0 items-center justify-center gap-[.4375rem] px-5 pt-[.4375rem] pb-8">
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
        isRequired={true}
      />
      <LinkInput
        text={linkText}
        setText={setLinkText}
        placeHolderContent="링크 URL을 입력해 주세요."
        isRequired={true}
      />
      <WideTextArea
        text={commentText}
        setText={setCommentText}
        placeHolderContent="제품 선택 이유, 특징, 사용 경험 등 제품의 매력을 보여줄 수 있는 내용을 자유롭게 작성해 주세요."
        isRequired={true}
      />
      <TipTooltip
        text={
          '최대 3가지 카테고리를 선택할 수 있습니다!최대 3가지 카테고리를 선택할 수 있습니다!최대 3가지 카테고리를 선택할 수 있습니다!'
        }
      />
      <CategoryMultiSelector
        selectedList={selectedCategoryList}
        setSelectedList={setSelectedCategoryList}
      />
    </div>
  );
};
