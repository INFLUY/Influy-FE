import { createContext, useContext } from 'react';
import { useGetCategoryList } from '@/services/talkBox/query/useGetCategoryList';

interface TalkBoxCategoryContextType {
  itemId: number;
  categoryData: Awaited<ReturnType<typeof useGetCategoryList>>['data'] | null;
}

export const TalkBoxCategoryContext = createContext<
  TalkBoxCategoryContextType | undefined
>(undefined);

export const useTalkBoxCategoryContext = () => {
  const context = useContext(TalkBoxCategoryContext);
  if (!context) {
    throw new Error(
      'useTalkBoxCategoryContext must be used within a TalkBoxCategoryProvider'
    );
  }
  return context;
};
