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
import { useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, FaqFormValues } from '@/schemas/faqSchema';
import { parseDateString } from '@/utils/formatDate';
import { CategoryType } from '@/types/common/CategoryType.types';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { useSnackbarStore } from '@/store/snackbarStore';
import { useStrictSellerId } from '@/hooks/auth/useStrictSellerId';

const FaqEditPage = () => {
  const navigate = useNavigate();
  const [updatedAt, setUpdatedAt] = useState<string>('');

  const sellerId = useStrictSellerId();
  const { itemId, faqId } = useParams();

  const CATEGORIES: CategoryType[] = [
    { id: 1, category: '색상' },
    { id: 2, category: '구성' },
    { id: 3, category: '디테일' },
    { id: 4, category: '사이즈' },
    { id: 5, category: '가격' },
    { id: 6, category: '진행일정' },
    { id: 7, category: '재고/수량' },
  ];

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
    console.log('아이템 아이디: ', itemId, 'faq 아이디: ', faqId); // 백 연동
    const faq = {
      id: 1,
      pinned: true,
      adjustImg: false,
      questionContent: '모야요??',
      answerContent: '이건 이거입니당',
      backgroundImgLink: '',
      faqCategoryId: 1,
      updatedAt: '2025-07-02T10:06:38.189Z',
    };
    methods.reset({
      category: faq.faqCategoryId || undefined,
      question: faq.questionContent || '',
      answer: faq.answerContent || '',
      image: faq.backgroundImgLink || '',
      isPinned: faq.pinned || false,
      adjustImg: faq.adjustImg || false,
    });
    setValue('adjustImg', faq.adjustImg);
    setValue('isPinned', faq.pinned);
    setValue('category', faq.faqCategoryId);
    setUpdatedAt(faq.updatedAt);
  }, []);

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
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
      document.getElementById('question')?.focus();
      showSnackbar(errors.question.message || '질문을 확인해 주세요.');
      return;
    }

    if (errors.answer) {
      document.getElementById('answer')?.focus();
      showSnackbar(errors.answer.message || '답변을 확인해 주세요.');
      return;
    }
  };

  const onSubmit = (data: FaqFormValues) => {
    console.log('폼 제출됨:', data);
  };

  const handleFaqDelete = () => {
    // TODO: 디자인 추가되면 경고 modal 추가해야 함
    alert('faq가 삭제되었습니다.');
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-1 flex-col"
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
              <FaqItemBanner sellerId={sellerId} itemId={Number(itemId)} />
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
                categoryList={CATEGORIES}
                selectedCategory={(getValues('category')
                  ? [getValues('category')]
                  : []
                ).map(Number)}
                setSelectedCategory={(value: number[]) =>
                  setValue('category', value[0], { shouldValidate: true })
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
                adjustImg={getValues('adjustImg')}
                setAdjustImg={(value: boolean) =>
                  setValue('adjustImg', value, { shouldValidate: true })
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
                isChecked={getValues('isPinned')}
                setIsChecked={(value: boolean) =>
                  setValue('isPinned', value, { shouldValidate: true })
                }
              />
            </article>
          </div>
        </section>
        <div className="sticky bottom-0 z-20 flex gap-[.4375rem] bg-white px-5 pt-[.625rem] pb-4">
          <DefaultButton
            type="button"
            activeTheme="white"
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
