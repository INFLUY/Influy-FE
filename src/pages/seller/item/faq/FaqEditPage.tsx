import {
  DefaultButton,
  FaqImageUploader,
  FormLimitedWideTextArea,
  FormWideTextArea,
  FaqItemBanner,
  PageHeader,
  ToggleButton,
  VanillaCategoryMultiSelector,
  LoadingSpinner,
} from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import {
  useForm,
  FormProvider,
  FieldErrors,
  useController,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, FaqFormValues } from '@/schemas/faqSchema';
import { parseDateString } from '@/utils/formatDate';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';
import { useGetFaqCard } from '@/services/sellerFaqCard/query/useGetFaqCard';
import { usePatchFaqCard } from '@/services/sellerFaqCard/mutation/usePatchFaqCard';
import { FaqCardRequestBody } from '@/types/common/FaqCardType.types';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { SELLER_ITEM_EDIT_FAQ_TAB_PATH } from '@/utils/generatePath';
import { PATH } from '@/routes/path';
import { useDeleteFaqCard } from '@/services/sellerFaqCard/mutation/useDeleteFaqCard';
import { useModalStore } from '@/store/useModalStore';

const FaqEditPage = () => {
  const navigate = useNavigate();
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const { sellerId } = useStrictId();
  const { itemId, faqId } = useParams();

  const { data: categories } = useGetItemFaqCategory({
    sellerId: sellerId!,
    itemId: Number(itemId),
  });

  const { data: prevFaq } = useGetFaqCard({
    sellerId: sellerId!,
    itemId: Number(itemId),
    faqCardId: Number(faqId),
  });

  const methods = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      category: undefined,
      question: '',
      answer: '',
      image: '',
      isPinned: false,
      adjustImg: false,
    },
  });

  useEffect(() => {
    methods.reset({
      category: prevFaq.faqCategoryId,
      question: prevFaq.questionContent,
      answer: prevFaq.answerContent,
      image: prevFaq.backgroundImgLink,
      isPinned: prevFaq.pinned,
      adjustImg: prevFaq.adjustImg,
    });
    setUpdatedAt(prevFaq.updatedAt);
  }, []);

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    setFocus,
  } = methods;

  const { showSnackbar } = useSnackbarStore();

  const categoryRef = useRef<HTMLDivElement | null>(null);

  const onError = (errors: FieldErrors<FaqFormValues>) => {
    if (errors.category) {
      categoryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      showSnackbar(errors.category.message || '카테고리를 확인해 주세요.');
      return;
    }
    if (errors.question) {
      setFocus('question');
      showSnackbar(errors.question.message || '질문을 확인해 주세요.');
      return;
    }

    if (errors.answer) {
      document.getElementById('answer')?.focus();
      showSnackbar(errors.answer.message || '답변을 확인해 주세요.');
      return;
    }
  };

  const { mutate: patchFaqCard } = usePatchFaqCard(() => {
    navigate(
      generatePath(
        `${PATH.SELLER.BASE}/${PATH.SELLER.ITEM.BASE}/${PATH.SELLER.ITEM.ITEM_ID.BASE}`,
        { itemId: itemId! }
      ),
      { replace: true }
    );
    showSnackbar('답변이 등록되었습니다.');
  });

  const onSubmit = (data: FaqFormValues) => {
    const formattedData: FaqCardRequestBody = {
      faqCategoryId: data.category,
      questionContent: data.question,
      answerContent: data.answer,
      backgroundImgLink: data.image,
      pinned: data.isPinned,
      adjustImg: data.adjustImg,
    };
    patchFaqCard({
      sellerId: sellerId!,
      faqCardId: Number(faqId),
      itemId: Number(itemId),
      data: formattedData,
    });
  };

  const { mutate: deleteFaqCard } = useDeleteFaqCard(() => {
    navigate(generatePath(SELLER_ITEM_EDIT_FAQ_TAB_PATH, { itemId: itemId! }), {
      replace: true,
    });
    showSnackbar('faq가 삭제되었습니다.');
  });

  const { showModal, hideModal } = useModalStore();

  const handleDeleteFaqClick = () => {
    showModal({
      text: `FAQ를 삭제하시겠습니까?\n한 번 삭제한 내용은 되돌릴 수 없습니다.`,
      leftButtonClick: () => {
        hideModal();
      },
      rightButtonClick: () =>
        deleteFaqCard({
          itemId: Number(itemId),
          faqCardId: Number(faqId),
          faqCategoryId: prevFaq.faqCategoryId,
        }),
    });
  };

  const handleFaqDelete = () => {
    handleDeleteFaqClick();
  };

  const { field: categoryField } = useController({
    name: 'category',
    control: methods.control,
  });

  const { field: adjustImgField } = useController({
    name: 'adjustImg',
    control: methods.control,
  });

  const { field: isPinnedField } = useController({
    name: 'isPinned',
    control: methods.control,
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-1 flex-col pt-11"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <PageHeader
          leftIcons={[
            <XIcon
              className="text-grey10 h-6 w-6"
              onClick={() => navigate(-1)}
            />,
          ]}
          additionalStyles="text-grey10"
        >
          FAQ 수정
        </PageHeader>
        <section className="flex flex-1 flex-col gap-6 pt-4 pb-[8.25rem]">
          <div className="body2-m text-grey06 flex flex-col gap-4">
            <span className="flex px-5">
              등록일자 {parseDateString(updatedAt)}
            </span>
            <Suspense fallback={<LoadingSpinner />}>
              <FaqItemBanner sellerId={sellerId!} itemId={Number(itemId)} />
            </Suspense>
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            {/* 카테고리 */}
            <article
              className="flex h-fit flex-col gap-4 px-5"
              ref={categoryRef}
            >
              <div className="flex w-full justify-between">
                <h2 className="body1-b text-black">
                  FAQ 카테고리 <span className="text-main">*</span>
                </h2>
                {/* 카테고리 수정 버튼 */}
                <button
                  type="button"
                  className="text-grey06 body2-m flex cursor-pointer items-center gap-1"
                >
                  <span>카테고리 수정</span>
                  <EditIcon className="text-grey09 h-3.5 w-3.5" />
                </button>
              </div>
              {/* FAQ 카테고리 */}
              <VanillaCategoryMultiSelector
                categoryList={categories}
                selectedCategory={
                  categoryField.value ? [Number(categoryField.value)] : []
                }
                setSelectedCategory={(value: number[]) =>
                  categoryField.onChange(value[0])
                }
              />
            </article>
            {/* 질문 */}
            <article className="flex h-fit flex-col gap-4 px-5">
              <h2 className="body1-b text-black">
                질문 <span className="text-main">*</span>
              </h2>
              <FormLimitedWideTextArea<FaqFormValues>
                id="question"
                name="question"
                placeHolderContent="질문을 입력해 주세요."
                maxLength={150}
              />
            </article>
            {/* 답변 */}
            <article className="flex h-fit flex-col gap-4 px-5">
              <h2 className="body1-b text-black">
                답변 <span className="text-main">*</span>
              </h2>
              <FormWideTextArea<FaqFormValues>
                id="answer"
                name="answer"
                placeHolderContent="질문에 대한 답변을 입력해 주세요."
              />
            </article>
            {/* 사진 */}
            <article className="flex h-fit flex-col gap-4">
              <h2 className="body1-b px-5 text-black">사진</h2>
              <FaqImageUploader
                name={'image'}
                adjustImg={adjustImgField.value}
                setAdjustImg={(value: boolean) =>
                  adjustImgField.onChange(value)
                }
              />
            </article>
            {/* 고정하기 */}
            <article className="flex h-fit items-center justify-between px-5">
              <div className="flex flex-col gap-[.375rem]">
                <h2 className="body1-b text-black">고정하기</h2>
                <span className="body2-m text-grey07">
                  해당 카테고리의 가장 앞에 노출됩니다.
                </span>
              </div>
              <ToggleButton
                name="핀 버튼"
                isChecked={isPinnedField.value}
                setIsChecked={(value: boolean) => isPinnedField.onChange(value)}
              />
            </article>
          </div>
        </section>
        <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
          <DefaultButton
            type="button"
            activeTheme="borderGrey"
            text="삭제하기"
            disabled={isSubmitting}
            onClick={handleFaqDelete}
          />
          <DefaultButton
            type="submit"
            text="등록하기"
            disabled={isSubmitting || !isValid}
            useDisabled={false}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FaqEditPage;
