import {
  AddButton,
  DefaultButton,
  FaqImageUploader,
  FormLimitedWideTextArea,
  FormWideTextArea,
  ItemBanner,
  PageHeader,
  SnackBar,
  TipTooltip,
  ToggleButton,
  VanillaCategoryMultiSelector,
} from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import FolderIcon from '@/assets/icon/seller/FolderIcon.svg?react';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { CategoryType } from '@/types/common/CategoryType.types';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, FaqFormValues } from '@/schemas/faqSchema';

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

  const [selectedCategory, setSelectedCategory] = useState<number[]>([]);
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [adjustImg, setAdjustImg] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

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
    formState: { isSubmitting, isValid },
  } = methods;

  // 카테고리가 input이나 textArea가 아니라서 수동 제어
  const onError = (errors: FieldErrors<FaqFormValues>) => {
    if (errors.category) {
      categoryRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      setSnackbar({
        open: true,
        message: errors.category.message || '카테고리를 확인해 주세요.',
      });
      return;
    }
    if (errors.question) {
      document.getElementById('question')?.focus();
      setSnackbar({
        open: true,
        message: errors.question.message || '질문을 확인해 주세요.',
      });
      return;
    }

    if (errors.answer) {
      document.getElementById('answer')?.focus();
      setSnackbar({
        open: true,
        message: errors.answer.message || '답변을 확인해 주세요.',
      });
      return;
    }
  };

  useEffect(() => {
    methods.setValue('category', selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    methods.setValue('isPinned', isPinned);
  }, [isPinned]);

  useEffect(() => {
    methods.setValue('adjustImg', adjustImg);
  }, [adjustImg]);

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
        <section className="flex h-full flex-1 flex-col justify-center gap-[1.375rem] px-5 py-[2.125rem]">
          <div className="flex flex-col items-center gap-6">
            <FolderIcon />
            <span className="body1-sb">아직 카테고리가 없어요</span>
          </div>
          <TipTooltip
            text={`자주 들어오는 질문들을 카테고리로 설정하면 좋아요.\nex) 자주 묻는 질문, 가격/구성, 진행일정, 이벤트, 재고/수량`}
            bgColor="bg-grey01"
            tipColor="text-black"
            textColor="text-grey08"
          />
          <AddButton handleOnClick={() => navigate('')}>
            카테고리 추가하기
          </AddButton>
        </section>
      ) : (
        // 카테고리 있을 때
        <FormProvider {...methods}>
          <div className="flex flex-1 flex-col gap-6 pt-4 pb-[5.1875rem]">
            <ItemBanner name={itemData?.name} tagline={itemData?.tagline} />
            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="flex flex-col gap-[1.875rem]"
            >
              {/* 카테고리 */}
              <div className="flex h-fit flex-col gap-4 px-5" ref={categoryRef}>
                <div className="flex w-full justify-between">
                  <h2 className="body1-b text-black">
                    FAQ 카테고리 <span className="text-[#F43232]">*</span>
                  </h2>
                  {/* 카테고리 수정 버튼 */}
                  <button
                    type="button"
                    className="text-grey06 body2-m flex cursor-pointer items-center gap-1"
                  >
                    카테고리 수정
                    <EditIcon className="h-[.875rem] w-[.875rem]" />
                  </button>
                </div>
                {/* FAQ 카테고리 */}
                <VanillaCategoryMultiSelector
                  categoryList={CATEGORIES}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
              {/* 질문 */}
              <div className="flex h-fit flex-col gap-4 px-5">
                <h2 className="body1-b text-black">
                  질문 <span className="text-[#F43232]">*</span>
                </h2>
                <FormLimitedWideTextArea<FaqFormValues>
                  id="question"
                  name="question"
                  placeHolderContent=""
                  maxLength={150}
                />
              </div>
              {/* 답변 */}
              <div className="flex h-fit flex-col gap-4 px-5">
                <h2 className="body1-b text-black">
                  답변 <span className="text-[#F43232]">*</span>
                </h2>
                <FormWideTextArea<FaqFormValues>
                  id="answer"
                  name="answer"
                  placeHolderContent="질문에 대한 답변을 입력해 주세요."
                />
              </div>
              {/* 사진 */}
              <div className="flex h-fit flex-col gap-4">
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
                  name={`faqImageUploader`}
                  adjustImg={adjustImg}
                  setAdjustImg={setAdjustImg}
                />
              </div>
              {/* 고정하기 */}
              <div className="flex h-fit items-center justify-between px-5">
                <div className="flex flex-col gap-[.375rem]">
                  <h2 className="body1-b text-black">고정하기</h2>
                  <span className="body2-m text-grey07">
                    해당 카테고리의 가장 앞에 노출됩니다.
                  </span>
                </div>
                <ToggleButton
                  name="핀 버튼"
                  isChecked={isPinned}
                  setIsChecked={setIsPinned}
                />
              </div>
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
      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
          additionalStyles="bottom-[5.6875rem]"
        >
          {snackbar.message}
        </SnackBar>
      )}
    </div>
  );
};

export default FaqRegistrationPage;
