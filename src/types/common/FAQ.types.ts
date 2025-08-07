import { CategoryType } from './CategoryType.types';

export interface FAQCategoryResponse {
  viewList: CategoryType[];
  listSize: number;
}
export type SheetMode =
  | 'none'
  | 'add'
  | 'editText'
  | 'editList'
  | 'questionEdit'
  | 'delete';
