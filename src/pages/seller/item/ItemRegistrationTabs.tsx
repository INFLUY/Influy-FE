import { useOutletContext } from 'react-router-dom';
import { ItemFormValues } from '@/types/item.types';
import { UseFormReturn } from 'react-hook-form';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';

import { FaqListEdit } from '@/components';
import { CategoryType } from '@/types/common/CategoryType.types';
import { FaqQuestion } from '@/types/common/ItemType.types';

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

type FaqContextType = {
  faqCategory: CategoryType[];
  faqQuestions: FaqQuestion[];
  itemId: number;
  methods: UseFormReturn<ItemFormValues>;
};

export const ItemFaqTab = () => {
  const { faqCategory, faqQuestions, itemId } =
    useOutletContext<FaqContextType>();

  return (
    <FaqListEdit
      faqCategory={faqCategory}
      faqQuestions={faqQuestions}
      itemId={itemId}
    />
  );
};
