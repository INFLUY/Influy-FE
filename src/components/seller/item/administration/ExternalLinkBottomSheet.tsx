import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction, useState } from 'react';
import { DefaultButton } from '../../common/Button';
import { LimitedTextInput, LinkInput } from '../../../common/DetailInput';

const ExternalLinkBottomSheet = ({
  linkId,
  isOpen,
  setIsOpen,
  setSelectedLinkId,
}: {
  linkId?: number | null;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedLinkId?: React.Dispatch<SetStateAction<number | null>>;
}) => {
  const [linkTitle, setLinkTitle] = useState<string>('');
  const [linkUrl, setLinkUrl] = useState<string>('');

  const handleClickDelete = () => {
    if (setSelectedLinkId) {
      setSelectedLinkId(null);
    }
    setIsOpen(false);
  };

  const handleClickSave = () => {
    if (setSelectedLinkId) {
      setSelectedLinkId(null);
    }
    setIsOpen(false);
  };

  const handleBottomSheetClose = () => {
    if (setSelectedLinkId) {
      setSelectedLinkId(null);
    }
    setIsOpen(false);
  };

  return (
    <BottomSheet onClose={handleBottomSheetClose} isBottomSheetOpen={isOpen}>
      <div className="flex w-full flex-col items-center">
        <span className="flex w-full flex-col items-center gap-[.125rem]">
          <h1 className="subhead-b text-grey10 w-full text-center">
            {linkId === undefined ? '링크 추가' : '링크 수정'}
          </h1>
          <div className="divide-grey02 flex w-full flex-col justify-start gap-1 divide-y px-5">
            <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
              <h2 className="body1-b">링크 이름</h2>
              <LimitedTextInput
                text={linkTitle}
                setText={setLinkTitle}
                maxLength={15}
                placeHolderContent="이름을 입력해주세요."
              />
            </div>
            <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
              <h2 className="body1-b">URL</h2>
              <LinkInput
                text={linkUrl}
                setText={setLinkUrl}
                placeHolderContent="링크 URL을 입력해주세요."
              />
            </div>
          </div>
        </span>
        <div className="scrollbar-hide flex w-full gap-[.4375rem] overflow-y-auto px-5 pt-1 pb-8">
          {linkId !== undefined && (
            <DefaultButton
              text="삭제하기"
              activeTheme="white"
              onClick={handleClickDelete}
            />
          )}
          <DefaultButton onClick={handleClickSave} />
        </div>
      </div>
    </BottomSheet>
  );
};

export default ExternalLinkBottomSheet;
