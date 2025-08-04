import { useOutletContext, useParams } from 'react-router-dom';
import { ItemFormValues } from '@/types/item.types';
import { UseFormReturn } from 'react-hook-form';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';

import { FaqListEdit } from '@/components';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetItemFaqCategory } from '@/services/sellerFaqCard/query/useGetItemFaqCategory';

type InfoContextType = {
  methods: UseFormReturn<ItemFormValues>;
  requiredFieldsRef: any;
};

export const ItemInfoTab = ({ mode }: { mode: 'create' | 'edit' }) => {
  const { requiredFieldsRef } = useOutletContext<InfoContextType>();

  return (
    <ItemForm
      mode={mode}
      imagesWrapperRef={requiredFieldsRef[0].ref}
      categoryWrapperRef={requiredFieldsRef[2].ref}
      startDateWrapperRef={requiredFieldsRef[3].ref}
      endDateWrapperRef={requiredFieldsRef[4].ref}
    />
  );
};

export const ItemFaqTab = () => {
  // Faq

  const { sellerId } = useStrictId();
  const { itemId } = useParams();

  const { data: faqCategory } = useGetItemFaqCategory({
    sellerId: sellerId!,
    itemId: Number(itemId),
  });

  return <FaqListEdit faqCategory={faqCategory} itemId={Number(itemId)} />;
};
