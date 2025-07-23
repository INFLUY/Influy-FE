import { useForm, FormProvider, useWatch } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema, requiredFieldsSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { DefaultButton, Tab, Tabs } from '@/components';
import { useState, useRef, RefObject } from 'react';
import { PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { SnackBar } from '@/components';
import { PATH } from '@/routes/path';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { CategoryType } from '@/types/common/CategoryType.types';
import { FaqQuestion } from '@/types/common/ItemType.types';
import { Outlet, useLocation } from 'react-router-dom';
import cn from '@/utils/cn';

export const dummyCategory: CategoryType[] = [
  { id: 0, category: '사이즈' },
  { id: 1, category: '색상' },
  { id: 2, category: '디테일' },
  { id: 3, category: '배송관련' },
  { id: 4, category: '색상1' },
];

const dummyFaqQuestion: FaqQuestion[] = [
  {
    id: 1,
    questionContent: '구성이 어떻게 되나요?',
    pinned: true,
    updatedAt: '2025-07-04T04:55:48.736Z',
  },
  {
    id: 2,
    questionContent:
      '키 160, 몸무게 60이면 L사이즈 맞을까요?키 160, 몸무게 60이면 L사이즈 맞을까요?키 160, 몸무게 60이면 L사이즈 맞을까요?키 160, 몸무게 60이면 L사이즈 맞을게 60이면 L사이즈 맞을게 60이면 L사이즈 맞을게 60이면 L사이즈 맞을게 60이면',
    pinned: true,
    updatedAt: '2025-07-04T04:55:48.736Z',
  },
];

//필수 항목 타입 정의
type fieldsToCheck<FieldNames extends string> = {
  name: FieldNames;
  ref?: RefObject<HTMLDivElement | null>;
};

export const ItemRegistrationPage = () => {
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isEditMode = pathname.includes('edit');

  // 필수 요소 미입력시 스크롤 이동을 위한 ref
  const imagesFieldRef = useRef<HTMLDivElement | null>(null);
  const categoryFieldRef = useRef<HTMLDivElement | null>(null);
  const startDateFieldRef = useRef<HTMLDivElement | null>(null);
  const endDateFieldRef = useRef<HTMLDivElement | null>(null);

  // 페이지 진입시 스크롤 상단으로 이동
  const scrollViewRef = useScrollToTop();

  // 상품 보관, 게시에 따른 이동 경로 정의
  const buildItemDetailPath = (
    itemId: number,
    status: 'archived' | 'published'
  ) => `${PATH.SELLER.base}/${PATH.SELLER.item.base}/${itemId}/${status}`;

  // useForm에 Zod 스키마 적용
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false, //에러시 자동 포커스 false -> 수동으로 에러 항목으로 스크롤
    defaultValues: {
      images: [],
      titleText: '',
      selectedCategoryList: [],
      hasStartDate: false,
      hasEndDate: false,
      startISODateTime: '',
      endISODateTime: '',
      summaryText: '',
      linkText: '',
      period: null,
      commentText: '',
    },
  });

  const {
    handleSubmit,
    setFocus,
    control,
    formState: { isSubmitting },
  } = methods;

  // 탭 목록 정의
  const REGISTER_TABS = [
    {
      id: 0,
      name: '상품 상세 정보',
      path: PATH.SELLER.item.registration.base,
    },
  ];

  const EDIT_TABS = [
    {
      id: 0,
      name: '상품 상세 정보',
      path: `${PATH.SELLER.item.administration.edit.tabs.info}`,
    },
    {
      id: 1,
      name: 'FAQ',
      path: `${PATH.SELLER.item.administration.edit.tabs.faq}`,
    },
  ];

  const TABS = isEditMode ? EDIT_TABS : REGISTER_TABS;

  // 유효성 검사 대상 필드 값 구독 (사진, 제목, 카테고리, 시작일 마감일 ... )
  const [images, titleText, selectedCategoryList, hasStartDate, hasEndDate] =
    useWatch({
      control,
      name: [
        'images',
        'titleText',
        'selectedCategoryList',
        'hasStartDate',
        'hasEndDate',
      ] as const,
    });

  /*
   * 게시하기 버튼 정리
   * 버튼 비활성화(incomplete): 4가지 필수 null (사진, 제목, 카테고리, 기간) -> 버튼 색상 회색(비활성화)
   * 유효하지 않은 상태(valid/validationError): 폼에서 에러 발생 -> 버튼 활성화, 스크롤해서 에러사항 알려줌
   */

  // 비활성화 여부 계산: 필수 4개 값 존재하지 않으면 게시하기 버튼 비활성화

  const requiredFields = {
    images,
    titleText,
    selectedCategoryList,
    hasStartDate,
    hasEndDate,
  };

  // 게시하기 버튼 활성화 조건 : 필수항목 4개 입력
  const isRequiredIncomplete =
    !requiredFieldsSchema.safeParse(requiredFields).success;

  //게시하기 버튼 valid를 위한 필드들
  const requiredFieldsRef: fieldsToCheck<keyof ItemFormValues>[] = [
    {
      name: 'images',
      ref: imagesFieldRef,
    },
    {
      name: 'titleText',
    },
    {
      name: 'selectedCategoryList',
      ref: categoryFieldRef,
    },
    {
      name: 'hasStartDate',
      ref: startDateFieldRef,
    },
    {
      name: 'hasEndDate',
      ref: endDateFieldRef,
    },
  ];

  const validationFieldsRef: fieldsToCheck<keyof ItemFormValues>[] = [
    { name: 'price' },
    { name: 'salePrice' },
    { name: 'summaryText' },
    { name: 'linkText' },
  ];

  // 게시하기 활성화: 필수 항목 4개 다 있을 시 실행
  const handleSubmitSuccess = async (formData: ItemFormValues) => {
    // 서버 제출용 데이터로 가공
    const payload = {
      itemImgList: JSON.stringify(formData.images),
      name: formData.titleText,
      itemCategoryList: formData.selectedCategoryList,
      startDate: formData.startISODateTime,
      endDate: formData.endISODateTime,
      tagline: formData.summaryText,
      regularPrice: formData.price,
      salePrice: formData.salePrice,
      marketLink: formData.linkText,
      itemPeriod: formData.period,
      comment: formData.commentText,
    };
    console.log('성공', payload); // declared but its value is never read. 에러 해결을 위함
    try {
      // TODO: 실제 API 호출
      const itemId: number = 1;

      //if success
      navigate(buildItemDetailPath(itemId, 'published'), {
        state: { isSnackbar: true },
      });
    } catch (error) {}
  };

  // 필수 항목 미입력 / 유효성 조건 미충족 시 실행
  const handleSubmitFailed = (fieldErrors: Record<string, any>) => {
    // 필수항목 미입력
    for (const field of requiredFieldsRef) {
      if (fieldErrors[field.name]) {
        if (field.name !== 'titleText' && field.ref?.current) {
          field.ref.current.scrollIntoView({
            block: 'center',
          });
          field.ref.current.focus();
        } else {
          setFocus(field.name);
        }
        const message =
          fieldErrors[field.name]?.message || field.name + ' error';
        setSnackbar({ open: true, message });
        return;
      }
    }

    // 필드 에러
    for (const field of validationFieldsRef) {
      if (fieldErrors[field.name]) {
        setFocus(field.name);
        const message =
          fieldErrors[field.name]?.message || field.name + ' error';
        setSnackbar({ open: true, message });
        return;
      }
    }
  };

  // 보관하기 버튼 활성화 조건: 제목 입력
  const titleValidationResult = itemSchema
    .pick({
      titleText: true,
    })
    .safeParse({ titleText });

  const onArchive = () => {
    if (!titleValidationResult.success) {
      const message =
        titleValidationResult.error.issues[0].message ?? '제목 오류';
      setSnackbar({ open: true, message });
      setFocus('titleText');
      return;
    }

    //임시
    const itemId: number = 1;

    //if success
    navigate(buildItemDetailPath(itemId, 'archived'), {
      state: { isSnackbar: true },
    });
  };

  return (
    <FormProvider {...methods}>
      <section className="sticky top-0 z-20 w-full bg-white">
        <PageHeader
          leftIcons={[
            <ArrowIcon
              className="h-6 w-6 cursor-pointer text-black"
              onClick={() => navigate(-1)}
              role="button"
              aria-label="뒤로 가기"
            />,
          ]}
          additionalStyles={cn('h-[3.375rem]', isEditMode && 'border-0')}
        />
        {isEditMode && (
          <Tabs>
            {TABS.map((tab) => (
              <Tab
                key={tab.id}
                isTabActive={pathname.includes(tab.path)}
                handleClickTab={() => navigate(tab.path, { replace: true })}
              >
                {tab.name}
              </Tab>
            ))}
          </Tabs>
        )}
      </section>
      <div className="flex flex-1 flex-col">
        <div className="invisible" ref={scrollViewRef} />
        {/* 폼 */}
        <form
          onSubmit={handleSubmit(handleSubmitSuccess, handleSubmitFailed)}
          className="relative flex w-full flex-1 flex-col"
        >
          <div
            className={cn('flex-1 pb-[8.25rem]', isEditMode ? 'pt-8' : 'pt-6')}
          >
            <Outlet
              context={{
                methods,
                requiredFieldsRef,
                faqCategory: dummyCategory,
                faqQuestions: dummyFaqQuestion,
                itemId: 1,
              }}
            />
          </div>
          {/* 하단 버튼 */}
          <section className="border-t-grey02 sticky right-0 bottom-0 z-20 flex h-[4.0625rem] w-full shrink-0 items-center justify-center gap-[.4375rem] border-t border-solid bg-white px-5">
            <DefaultButton
              onClick={onArchive}
              text="보관하기"
              disabled={!titleValidationResult.success}
              useDisabled={false}
            />
            <DefaultButton
              type="submit"
              text="게시하기"
              disabled={isSubmitting || isRequiredIncomplete}
              useDisabled={false}
            />
          </section>
        </form>
      </div>

      {snackbar.open && (
        <SnackBar
          handleSnackBarClose={() => setSnackbar({ open: false, message: '' })}
        >
          {snackbar.message}
        </SnackBar>
      )}
    </FormProvider>
  );
};
