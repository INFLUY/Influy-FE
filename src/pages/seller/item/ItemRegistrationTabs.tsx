import { useOutletContext, useParams } from 'react-router-dom';
import { ItemFormValues } from '@/types/item.types';
import { UseFormReturn } from 'react-hook-form';
import { ItemForm } from '@/components/seller/item/registration/ItemForm';

import { FaqListEdit } from '@/components';
import { FaqQuestion } from '@/types/common/ItemType.types';
import { useStrictId } from '@/hooks/auth/useStrictId';
import { useGetItemFaqCategory } from '@/services/sellerItemFaq/query/useGetItemFaqCategory';

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

export const ItemFaqTab = () => {
  // Faq

  const { sellerId } = useStrictId();
  const { itemId } = useParams();

  const { data: faqCategory } = useGetItemFaqCategory({
    sellerId: sellerId!,
    itemId: Number(itemId),
  });

  return (
    <FaqListEdit
      faqCategory={faqCategory}
      faqQuestions={dummyFaqQuestion}
      itemId={Number(itemId)}
    />
  );
};
