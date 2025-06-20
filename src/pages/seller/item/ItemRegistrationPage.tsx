import { useForm, FormProvider, useWatch } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';
import { DefaultButton, Tab, Tabs } from '@/components';
import { useState, useRef, RefObject } from 'react';
import { PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import { useNavigate } from 'react-router-dom';
import { SnackBar } from '@/components';

export const ItemRegistrationPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });
  // useForm에 Zod 스키마 적용
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,

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
  const TABS = [
    { id: 0, name: '상품 상세 정보' },
    { id: 1, name: 'FAQ' },
  ];

  //─── 네 가지 필드 값 구독
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

  const isSubmitButtonDisabled: boolean =
    !images.length ||
    !titleText ||
    !selectedCategoryList.length ||
    !hasStartDate ||
    !hasEndDate;

  // 필수 요소 미입력시 스크롤 이동을 위한 ref
  const imagesContainerRef = useRef<HTMLDivElement | null>(null);
  const categoryContainerRef = useRef<HTMLDivElement | null>(null);
  const startDateContainerRef = useRef<HTMLDivElement | null>(null);
  const endDateContainerRef = useRef<HTMLDivElement | null>(null);

  type ScrollField<FieldNames extends string> = {
    name: FieldNames;
    ref?: RefObject<HTMLDivElement | null>;
  };

  const scrollFields: ScrollField<keyof ItemFormValues>[] = [
    {
      name: 'images',
      ref: imagesContainerRef,
    },
    {
      name: 'titleText',
    },
    {
      name: 'selectedCategoryList',
      ref: categoryContainerRef,
    },
    {
      name: 'hasStartDate',
      ref: startDateContainerRef,
    },
    {
      name: 'hasEndDate',
      ref: endDateContainerRef,
    },
  ];

  // 필수 항목 4개 다 있을 시 실행
  const onValid = async (formData: ItemFormValues) => {
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
    console.log(payload); // declared but its value is never read. 에러 해결을 위함
    try {
      // TODO: 실제 API 호출
      const itemId: number = 1;

      //if success
      navigate(`/my-market/item/${itemId}?status=saved`);
    } catch (error) {}
  };

  // 필수 항목 미입력 시 실행
  const onInvalid = (fieldErrors: Record<string, any>) => {
    for (const field of scrollFields) {
      if (fieldErrors[field.name]) {
        if (field.name !== 'titleText' && field.ref?.current) {
          field.ref.current.scrollIntoView({
            block: 'center',
          });
          field.ref.current.focus();
        } else {
          setFocus(field.name);
        }
        const message = fieldErrors[field.name]?.message || '';
        setSnackbar({ open: true, message });
        break;
      }
    }
  };

  const onSave = () => {
    // 보관하기 로직 추가
    //임시
    const itemId: number = 1;

    //if success
    navigate(`/my-market/item/${itemId}?status=saved`);
  };

  return (
    <FormProvider {...methods}>
      <section className="sticky top-0 z-50 w-full bg-white">
        <PageHeader
          leftIcons={[
            <ArrowIcon
              className="h-6 w-6 cursor-pointer text-black"
              onClick={() => navigate(-1)}
            />,
          ]}
          rightIcons={[
            <ShareIcon className="h-6 w-6 cursor-pointer text-black" />,
            <StatisticIcon className="h-6 w-6 cursor-pointer text-black" />,
          ]}
          additionalStyles="h-[3.375rem]"
        />
        <Tabs>
          {TABS.map((tab) => (
            <Tab
              key={tab.id}
              isTabActive={activeTab === tab.id}
              handleClickTab={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </Tab>
          ))}
        </Tabs>
      </section>

      <form
        onSubmit={handleSubmit(onValid, onInvalid)}
        className="relative flex min-h-full min-w-full flex-col"
      >
        <section className="pt-5">
          {activeTab === 0 && (
            <ItemForm
              mode="create"
              imagesWrapperRef={imagesContainerRef}
              categoryWrapperRef={categoryContainerRef}
              startDateWrapperRef={startDateContainerRef}
              endDateWrapperRef={endDateContainerRef}
            />
          )}
          {activeTab === 1 && <span>FAQ 내용 준비 중입니다.</span>}
        </section>
        <section className="border-t-grey02 flex h-24 w-full shrink-0 items-center justify-center gap-[.4375rem] border-t border-solid bg-white px-5 pt-2.5 pb-2">
          <DefaultButton onClick={onSave} text="보관하기" />
          <DefaultButton
            type="submit"
            text="게시하기"
            disabled={isSubmitting || isSubmitButtonDisabled}
            useDisabled={false}
          />
        </section>
      </form>
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
