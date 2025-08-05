import { ItemCurrentStatusType } from './common/ItemType.types';

export interface ItemFormValues {
  images: string[];
  titleText: string;
  selectedCategoryList: number[];
  hasStartDate: boolean;
  startISODateTime: string | null;
  hasEndDate: boolean;
  endISODateTime: string | null;
  summaryText: string;
  price: number | undefined;
  salePrice: number | undefined;
  linkText: string | undefined;
  period: number | undefined;
  commentText: string | undefined;
  status: ItemCurrentStatusType;
}
