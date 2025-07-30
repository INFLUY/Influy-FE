import { createContext, useContext } from 'react';
import { useGetCategoryList } from '@/services/talkBox/query/useGetCategoryList';
import { QuestionDTO } from '@/types/seller/TalkBox.types';
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

interface BottomSheetContextType {
  singleQuestion: QuestionDTO | null;
  setSingleQuestion: (q: QuestionDTO | null) => void;
}

export const BottomSheetContext = createContext<
  BottomSheetContextType | undefined
>(undefined);

export const useBottomSheetContext = () => {
  const ctx = useContext(BottomSheetContext);
  if (!ctx) throw new Error('BottomSheetContext is missing');
  return ctx;
};
