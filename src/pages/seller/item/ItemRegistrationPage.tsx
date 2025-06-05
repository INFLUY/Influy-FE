import { useForm, FormProvider } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';
import { DefaultButton, Tab, Tabs } from '@/components';
import { useState } from 'react';
import { PageHeader } from '@/components';
import ArrowIcon from '@/assets/icon/common/ArrowIcon.svg?react';
import ShareIcon from '@/assets/icon/common/ShareIcon.svg?react';
import StatisticIcon from '@/assets/icon/common/StatisticIcon.svg?react';
import { useNavigate } from 'react-router-dom';
export const ItemRegistrationPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(0);

  // 탭 목록 정의
  const TABS = [
    { id: 0, name: '상품 상세 정보' },
    { id: 1, name: 'FAQ' },
  ];
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: false,

    defaultValues: {
      images: [],
      titleText: '',
      selectedCategoryList: [],
      hasStartDate: false,
      hasEndDate: false,
      startISODateTime: null,
      endISODateTime: null,
      summaryText: '',
      linkText: null,
      period: null,
      commentText: null,
    },
  });

  const {
    formState: { isSubmitting, isValid, isDirty },
  } = methods;

  const onSubmit = async (formData: ItemFormValues) => {
    // 서버 제출용 데이터로 가공
    const payload = {
      itemImgList: JSON.stringify(formData.images), // 예: ["xxx.png", "yyy.png"]
      name: formData.titleText,
      itemCategoryList: formData.selectedCategoryList, // 예: ["뷰티", "패션"]
      startDate: formData.startISODateTime,
      endDate: formData.endISODateTime,
      tagline: formData.summaryText,
      regularPrice: formData.price,
      salePrice: formData.salePrice,
      marketLink: formData.linkText,
      itemPeriod: formData.period,
      comment: formData.commentText,
      isArchived: false, // 신규 등록은 기본 false
    };
  };

  const onSave = () => {
    // 보관하기 로직 추가
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
        >
          <div className="h-[1.6875rem]" />
        </PageHeader>
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
        onSubmit={methods.handleSubmit(onSubmit)}
        className="relative flex min-h-full min-w-full flex-col"
      >
        <section className="pt-5">
          {activeTab === 0 && <ItemForm mode="create" />}
          {activeTab === 1 && <span>FAQ 내용 준비 중입니다.</span>}
        </section>
        <section className="border-t-grey02 flex h-24 w-full shrink-0 items-center justify-center gap-[.4375rem] border-t border-solid bg-white px-5 pt-2.5 pb-2">
          <DefaultButton onClick={onSave} text="보관하기" />
          <DefaultButton
            type="submit"
            text="게시하기"
            disabled={isSubmitting || !isValid}
          />
        </section>
      </form>
    </FormProvider>
  );
};
