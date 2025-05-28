import { useForm, FormProvider } from 'react-hook-form';
/* zod/v4 사용해서 25/05/28일 기준 zodResolver 사용 불가능(아직 업데이트 안 됨)
 * 추후 hookform/resolvers 업데이트 상황 보고 업데이트 필요
 */ //github.com/react-hook-form/resolvers/issues/768
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { itemSchema } from '@/schemas/itemSchema';
import { ItemFormValues } from '@/types/item.types';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';

export const ItemRegistrationPage = () => {
  const methods = useForm<ItemFormValues>({
    resolver: standardSchemaResolver(itemSchema),
    defaultValues: {
      titleText: '',
      selectedCategoryList: [],
      startISODateTime: null,
      endISODateTime: null,
      summaryText: '',
      price: 0,
      salePrice: 0,
      linkText: null,
      period: null,
      commentText: null,
    },
  });

  const onSubmit = (data: ItemFormValues) => {
    console.log('제출된 값:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <ItemForm mode="create" />
        {/* <button type="submit">저장</button> */}
      </form>
    </FormProvider>
  );
};
