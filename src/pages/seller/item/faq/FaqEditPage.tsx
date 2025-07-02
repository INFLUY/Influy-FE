import {
  DefaultButton,
  FaqImageUploader,
  FormLimitedWideTextArea,
  FormWideTextArea,
  ItemBanner,
  PageHeader,
  SnackBar,
  ToggleButton,
  VanillaCategoryMultiSelector,
} from '@/components';
import XIcon from '@/assets/icon/common/XIcon.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm, FormProvider, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, FaqFormValues } from '@/schemas/faqSchema';
import { parseDateString } from '@/utils/formatDate';
import { CategoryType } from '@/types/common/CategoryType.types';
import EditIcon from '@/assets/icon/common/Edit1Icon.svg?react';

const FaqEditPage = () => {
  const navigate = useNavigate();
  const [faqCategory, setFaqCategory] = useState<number[]>([]);
  const [updatedAt, setUpdatedAt] = useState<string>('');
  const [isPinned, setIsPinned] = useState<boolean>(false);
  const [adjustImg, setAdjustImg] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

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
    resolver: zodResolver(faqSchema(true)),
    mode: 'onChange',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      question: '',
      answer: '',
      image: '',
      isPinned: false,
      adjustImg: false,
    },
  });

  const { itemId, faqId } = useParams();

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
      question: faq.questionContent || '',
      answer: faq.answerContent || '',
      image: faq.backgroundImgLink || '',
      isPinned: faq.pinned || false,
      adjustImg: faq.adjustImg || false,
    });
    setAdjustImg(faq.adjustImg);
    setIsPinned(faq.pinned);
    setFaqCategory([faq.faqCategoryId]);
    setUpdatedAt(faq.updatedAt);
  }, []);

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

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onError = (errors: FieldErrors<FaqFormValues>) => {
    for (const [fieldName, error] of Object.entries(errors)) {
      const message =
        error?.message || fieldName + ' 과정에서 에러가 발생했습니다.';
      setSnackbar({ open: true, message });
      return;
    }
  };

  useEffect(() => {
    methods.setValue('isPinned', isPinned);
  }, [isPinned, methods]);

  useEffect(() => {
    methods.setValue('adjustImg', adjustImg);
  }, [adjustImg, methods]);

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
        <div className="flex flex-1 flex-col gap-6 pt-4 pb-[8.25rem]">
          <div className="body2-m text-grey06 flex flex-col gap-4">
            <span className="flex px-5">
              등록일자 {parseDateString(updatedAt)}
            </span>
            <ItemBanner name={itemData?.name} tagline={itemData?.tagline} />
          </div>
          <div className="flex flex-col gap-[1.875rem]">
            <div className="flex h-fit flex-col gap-4 px-5">
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
                disabled={true}
                categoryList={CATEGORIES}
                selectedCategory={faqCategory}
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
                placeHolderContent="질문을 입력해 주세요."
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
              <h2 className="body1-b px-5 text-black">사진</h2>
              <FaqImageUploader
                name={'image'}
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
          </div>
        </div>
        {snackbar.open && (
          <SnackBar
            handleSnackBarClose={() =>
              setSnackbar({ open: false, message: '' })
            }
            additionalStyles="bottom-[5.6875rem]"
          >
            {snackbar.message}
          </SnackBar>
        )}
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
