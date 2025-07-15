import BottomSheet from '@/components/common/BottomSheet';
import { SetStateAction } from 'react';
import { DefaultButton } from '@/components/seller/common/Button';
import { usePostMarketLinks } from '@/services/marketLinks/mutation/usePostMarketLinks';
import {
  FormLimitedTextInput,
  FormLinkInput,
} from '@/components/common/FormTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import { MarketLinkFormValues, marketLinkSchema } from '@/schemas/linkSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseLinkType } from '@/types/seller/LinkType.types';

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
  const methods = useForm<MarketLinkFormValues>({
    resolver: zodResolver(marketLinkSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      linkName: '',
      link: '',
      ...(linkId !== null ? { linkId } : {}),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const handleClickDelete = () => {
    if (setSelectedLinkId) {
      setSelectedLinkId(null);
    }
    setIsOpen(false);
  };

  const { mutate: postLink } = usePostMarketLinks(() => {
    setIsOpen(false);
  });

  const onSubmit = (data: BaseLinkType) => {
    if (setSelectedLinkId) {
      setSelectedLinkId(null);
    }
    postLink(data);
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
        <FormProvider {...methods}>
          <span className="flex w-full flex-col items-center gap-[.125rem]">
            <h1 className="subhead-b text-grey10 w-full text-center">
              {linkId === undefined ? '링크 추가' : '링크 수정'}
            </h1>
            <div className="divide-grey02 flex w-full flex-col justify-start gap-1 divide-y px-5">
              <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
                <h2 className="body1-b">링크 이름</h2>
                <FormLimitedTextInput
                  name="linkName"
                  maxLength={15}
                  rows={1}
                  placeHolderContent="이름을 입력해주세요."
                />
              </div>
              <div className="flex w-full flex-col gap-[.625rem] pt-3 pb-6">
                <h2 className="body1-b">URL</h2>
                <FormLinkInput name="link" />
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
            <DefaultButton
              onClick={handleSubmit(onSubmit)}
              activeTheme="black"
              disabled={isSubmitting || !isValid}
              useDisabled={false}
            />
          </div>
        </FormProvider>
      </div>
    </BottomSheet>
  );
};

export default ExternalLinkBottomSheet;
