import { useForm, FormProvider, useWatch } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema, requiredFieldsSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { DefaultButton, Tab, Tabs } from '@/components';
import { useRef, RefObject, useEffect } from 'react';
import { PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from '@/routes/path';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { Outlet, useLocation } from 'react-router-dom';
import cn from '@/utils/cn';
import { useSnackbarStore } from '@/store/snackbarStore';
import { usePostItem } from '@/services/sellerItem/mutation/usePostItem';
import { usePutItem } from '@/services/sellerItem/mutation/usePutItem';
import { useGetMarketItemDetail } from '@/services/sellerItem/query/useGetMarketItemDetail';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { parseToKstDate } from '@/utils/formatDate';

//필수 항목 타입 정의
type fieldsToCheck<FieldNames extends string> = {
  name: FieldNames;
  ref?: RefObject<HTMLDivElement | null>;
};

export const ItemRegistrationPage = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { showSnackbar } = useSnackbarStore();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { sellerId } = useStrictId();

  // 필수 요소 미입력시 스크롤 이동을 위한 ref
  const imagesFieldRef = useRef<HTMLDivElement | null>(null);
  const categoryFieldRef = useRef<HTMLDivElement | null>(null);
  const startDateFieldRef = useRef<HTMLDivElement | null>(null);
  const endDateFieldRef = useRef<HTMLDivElement | null>(null);

  // 페이지 진입시 스크롤 상단으로 이동
  const scrollViewRef = useScrollToTop();

  const isEditMode = mode === 'edit';
  const { itemId } = useParams();
  const numericItemId = itemId ? Number(itemId) : undefined;

  const { data: prevItemData } = useGetMarketItemDetail({
    sellerId: sellerId!,
    itemId: numericItemId,
  });

  // useForm에 Zod 스키마 적용
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false, // 에러시 자동 포커스 false -> 수동으로 에러 항목으로 스크롤
    defaultValues: {
      images: [],
      titleText: '',
      selectedCategoryList: [],
      hasStartDate: false,
      hasEndDate: false,
      startISODateTime: undefined,
      endISODateTime: undefined,
      summaryText: '',
      price: undefined,
      salePrice: undefined,
      linkText: '',
      period: undefined,
      commentText: '',
      status: 'DEFAULT',
    },
  });

  useEffect(() => {
    if (prevItemData)
      methods.reset({
        images: prevItemData.itemImgList ?? [],
        titleText: prevItemData.itemName ?? '',
        selectedCategoryList: prevItemData.itemCategoryList ?? [],
        hasStartDate:
          !prevItemData.isDateUndefined && prevItemData.startDate !== undefined,
        hasEndDate:
          !prevItemData.isDateUndefined && prevItemData.endDate !== undefined,
        startISODateTime: prevItemData.startDate
          ? parseToKstDate(prevItemData.startDate).toISOString()
          : undefined,
        endISODateTime: prevItemData.endDate
          ? parseToKstDate(prevItemData.endDate).toISOString()
          : undefined,
        summaryText: prevItemData.tagline ?? '',
        price: prevItemData.regularPrice ?? undefined,
        salePrice: prevItemData.salePrice ?? undefined,
        linkText: prevItemData.marketLink ?? '',
        period: prevItemData.itemPeriod ?? 1,
        commentText: prevItemData.comment ?? '',
        status: prevItemData.status,
      });
  }, [prevItemData]);

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
      path: PATH.SELLER.ITEM.REGISTRATION.BASE,
    },
  ];

  const EDIT_TABS = [
    {
      id: 0,
      name: '상품 상세 정보',
      path: `${PATH.SELLER.ITEM.ITEM_ID.EDIT.TABS.INFO}`,
    },
    {
      id: 1,
      name: 'FAQ',
      path: `${PATH.SELLER.ITEM.ITEM_ID.EDIT.TABS.FAQ}`,
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

  const { mutate: postItem } = usePostItem(() =>
    showSnackbar('상품이 게시되었습니다.')
  );

  const { mutate: putItem } = usePutItem(() =>
    showSnackbar('상품이 수정되었습니다.')
  );

  const getItemPayload = (formData: ItemFormValues, isArchived: boolean) => {
    const isValid = (val: unknown): val is string | number =>
      val !== undefined && val !== null && val !== '';

    return {
      itemImgList: formData.images,
      name: formData.titleText,
      itemCategoryIdList: formData.selectedCategoryList.map(String),
      ...(isValid(formData.startISODateTime) && {
        startDate: formData.startISODateTime,
      }),
      ...(isValid(formData.endISODateTime) && {
        endDate: formData.endISODateTime,
      }),
      ...(isValid(formData.summaryText) && { tagline: formData.summaryText }),
      ...(isValid(formData.price) && { regularPrice: formData.price }),
      ...(isValid(formData.salePrice) && { salePrice: formData.salePrice }),
      ...(isValid(formData.linkText) && { marketLink: formData.linkText }),
      itemPeriod: formData.period ?? 1,
      ...(isValid(formData.commentText) && { comment: formData.commentText }),
      isArchived,
      ...(formData.status === 'EXTEND' && { comment: formData.status }),
      isDateUndefined: !formData.hasStartDate || !formData.hasEndDate,
    };
  };

  // 게시하기 활성화: 필수 항목 4개 다 있을 시 실행
  const handleSubmitSuccess = async (formData: ItemFormValues) => {
    const payload = getItemPayload(formData, false);

    if (!isEditMode) {
      postItem(payload);
    } else if (isEditMode && itemId !== undefined) {
      putItem({ data: payload, itemId: Number(itemId) });
    }
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
        showSnackbar(message);
        return;
      }
    }

    // 필드 에러
    for (const field of validationFieldsRef) {
      if (fieldErrors[field.name]) {
        setFocus(field.name);
        const message =
          fieldErrors[field.name]?.message || field.name + ' error';
        showSnackbar(message);
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
    const formData = methods.getValues();
    if (!titleValidationResult.success) {
      const message =
        titleValidationResult.error.issues[0].message ?? '제목 오류';
      showSnackbar(message);
      setFocus('titleText');
      return;
    }
    const payload = getItemPayload(formData, true);

    if (!isEditMode) {
      postItem(payload);
    } else if (isEditMode && itemId !== undefined) {
      putItem({ data: payload, itemId: Number(itemId) });
    }
  };

  return (
    <FormProvider {...methods}>
      <section className="sticky top-0 z-20 w-full bg-white pt-11">
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
              }}
            />
          </div>
          {/* 하단 버튼 */}
          <section className="border-t-grey02 sticky right-0 bottom-0 z-20 flex h-[4.0625rem] w-full shrink-0 items-center justify-center gap-[.4375rem] border-t border-solid bg-white px-5">
            <DefaultButton
              onClick={onArchive}
              text="보관하기"
              activeTheme="white"
              disabledTheme="borderGrey"
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
    </FormProvider>
  );
};
