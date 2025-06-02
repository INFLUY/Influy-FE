import { useForm, FormProvider } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';
import { DefaultButton } from '@/components';

export const ItemRegistrationPage = () => {
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    defaultValues: {
      images: [],
      titleText: '',
      selectedCategoryList: [],
      hasStartDate: false,
      hasEndDate: false,
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

  const onSubmit = async (formData: ItemFormValues) => {
    console.log('원본 form 데이터:', formData);

    // ✅ 서버 제출용 데이터로 가공
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

    console.log('제출 payload:', payload);
  };
  const onSave = () => {
    console.log('보관하기 버튼 클릭');
    // 보관하기 로직 추가
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ItemForm mode="create" />
        <article className="border-t-grey02 absolute bottom-0 left-0 flex h-24 w-full shrink-0 items-center justify-center gap-6 border-t border-solid bg-white px-5 pt-2.5 pb-2">
          <DefaultButton onClick={onSave} text="보관하기" />
          <DefaultButton
            type="submit"
            text="게시하기"
            disabled={methods.formState.isSubmitting}
          />
        </article>
      </form>
    </FormProvider>
  );
};
