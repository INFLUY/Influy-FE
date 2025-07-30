import {
  BottomSheet,
  SellerModal,
  FormLimitedTextInput,
  FormLinkInput,
  DefaultButton,
} from '@/components';
import { SetStateAction, useState } from 'react';
import { usePostMarketLinks } from '@/services/marketLinks/mutation/usePostMarketLinks';
import { FormProvider, useForm } from 'react-hook-form';
import { MarketLinkFormValues, marketLinkSchema } from '@/schemas/linkSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseLinkType, LinkType } from '@/types/seller/LinkType.types';
import { useDeleteMarketLink } from '@/services/marketLinks/mutation/useDeleteMarketLink';
import { useSnackbarStore } from '@/store/snackbarStore';
import { usePatchMarketLink } from '@/services/marketLinks/mutation/usePatchMarketLink';

const ExternalLinkBottomSheet = ({
  existingLink,
  isOpen,
  setIsOpen,
  setSelectedLink,
}: {
  existingLink?: LinkType;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedLink?: React.Dispatch<SetStateAction<LinkType | null>>;
}) => {
  const [isLinkDeleteModalOpen, setIsLinkDeleteModalOpen] =
    useState<boolean>(false);
  const { showSnackbar } = useSnackbarStore();

  const methods = useForm<MarketLinkFormValues>({
    resolver: zodResolver(marketLinkSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      linkName: existingLink?.linkName ?? '',
      link: existingLink?.link ?? '',
      ...(existingLink?.id !== undefined ? { id: existingLink?.id } : {}),
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  // 삭제 모달 닫기
  const handleDeleteModalClose = () => {
    setIsLinkDeleteModalOpen(false);
    setIsOpen(false);
  };

  const { mutate: deleteLink } = useDeleteMarketLink(() =>
    showSnackbar('링크가 삭제되었습니다.')
  );

  // 삭제
  const handleDelete = () => {
    if (existingLink?.id !== undefined) {
      deleteLink(existingLink?.id);
    }
    setSelectedLink?.(null);
    handleDeleteModalClose();
  };

  const { mutate: postLink } = usePostMarketLinks(() => {
    showSnackbar('변경사항이 저장되었습니다.');
    setIsOpen(false);
  });

  const { mutate: patchLink } = usePatchMarketLink(() => {
    showSnackbar('변경사항이 저장되었습니다.');
    setIsOpen(false);
  });

  const onSubmit = (data: BaseLinkType) => {
    if (existingLink?.id) patchLink({ data, linkId: existingLink.id });
    else postLink(data);
  };

  const handleBottomSheetClose = () => {
    setSelectedLink?.(null);
    setIsOpen(false);
  };

  if (isLinkDeleteModalOpen)
    return (
      <SellerModal
        text={`링크를 삭제하시겠습니까?`}
        leftButtonClick={handleDeleteModalClose}
        rightButtonClick={handleDelete}
        onClose={handleDeleteModalClose}
        setIsModalOpen={setIsLinkDeleteModalOpen}
      />
    );

  return (
    <BottomSheet onClose={handleBottomSheetClose} isBottomSheetOpen={isOpen}>
      <div className="flex w-full flex-col items-center">
        <FormProvider {...methods}>
          <span className="flex w-full flex-col items-center gap-[.125rem]">
            <h1 className="subhead-b text-grey10 w-full text-center">
              {existingLink === undefined ? '링크 추가' : '링크 수정'}
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
            {existingLink !== undefined && (
              <DefaultButton
                text="삭제하기"
                activeTheme="borderGrey"
                onClick={() => setIsLinkDeleteModalOpen(true)}
              />
            )}
            <DefaultButton
              type="submit"
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
