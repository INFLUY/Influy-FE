import {
  DefaultButton,
  FaqImageUploader,
  FormLimitedWideTextArea,
  FormWideTextArea,
  FaqItemBanner,
  PageHeader,
  TipTooltip,
  ToggleButton,
  VanillaCategoryMultiSelector,
  EmptyCategoryPlaceholder,
} from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { CategoryType } from '@/types/common/CategoryType.types';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, FaqFormValues } from '@/schemas/faqSchema';
import { useSnackbarStore } from '@/store/snackbarStore';

const FaqRegistrationPage = () => {
  const navigate = useNavigate();

  const CATEGORIES: CategoryType[] = [
    { id: 1, category: '색상' },
    { id: 2, category: '구성' },
    { id: 3, category: '디테일' },
    { id: 4, category: '사이즈' },
    { id: 5, category: '가격' },
    { id: 6, category: '진행일정' },
    { id: 7, category: '재고/수량' },
  ];

  const { showSnackbar } = useSnackbarStore();

  const categoryRef = useRef<HTMLDivElement | null>(null);

  const itemData = {
    itemImgList: ['xxx.png', 'xxxxx.png', 'xxxxxx.png'],
    name: '제작 원피스',
    itemCategoryList: ['뷰티', '패션'],
    startDate: '2025-06-22T08:57:56.040Z',
    endDate: '2025-06-22T08:57:56.040Z',
    tagline: '빤짝거리는 원피스입니다',
    regularPrice: 100000,
    salePrice: 80000,
    marketLink: 'xxxx.com',
    itemPeriod: 1,
    comment: '이렇게 빤짝이는 드레스 흔하지 않아요 어렵게 구해왔어요',
    isArchived: false,
  };

  const methods = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema(false)),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      category: [],
      question: '',
      answer: '',
      image: '',
      isPinned: false,
      adjustImg: false,
    },
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isSubmitting, isValid },
  } = methods;

  // 카테고리가 input이나 textArea가 아니라서 수동 제어
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

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        leftIcons={[
          <XIcon
            className="text-grey10 h-6 w-6"
            onClick={() => navigate(-1)}
          />,
        ]}
        additionalStyles="text-grey10"
      >
        FAQ 등록
      </PageHeader>
      {CATEGORIES.length === 0 ? (
        // 카테고리 없을 때
        <EmptyCategoryPlaceholder openAddSheet={() => {}} />
      ) : (
        // 카테고리 있을 때
        <FormProvider {...methods}>
          <div className="flex flex-1 flex-col gap-6 pt-4 pb-[5.1875rem]">
            <FaqItemBanner name={itemData?.name} tagline={itemData?.tagline} />
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-[1.875rem]"
            >
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
                  selectedCategory={(getValues('category') ?? []).map(Number)}
                  setSelectedCategory={(value: number[]) =>
                    setValue('category', value, { shouldValidate: true })
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
                <span className="flex flex-col gap-4 px-5">
                  <h2 className="body1-b text-black">사진</h2>
                  <TipTooltip
                    text={`답변에 도움이 될만한 사진을 한 장 첨부해 주세요.\n사진을 첨부하지 않으면 기본 이미지가 제공됩니다.`}
                    bgColor="bg-grey01"
                    tipColor="text-black"
                    textColor="text-grey08"
                  />
                </span>
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
            </form>
          </div>
        </FormProvider>
      )}
      <div className="sticky bottom-0 z-20 bg-white px-5 pt-[.625rem] pb-4">
        <DefaultButton
          type="submit"
          text="등록하기"
          disabled={isSubmitting || !isValid}
          useDisabled={false}
          onClick={handleSubmit(onSubmit, onError)}
        />
      </div>
    </div>
  );
};

export default FaqRegistrationPage;
