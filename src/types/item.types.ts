export interface ItemFormValues {
  images: string[];
  titleText: string;
  selectedCategoryList: number[];
  hasStartDate: boolean;
  startISODateTime: string | null;
  hasEndDate: boolean;
  endISODateTime: string | null;
  summaryText: string;
  price: number;
  salePrice: number;
  linkText: string | null;
  period: number | null;
  commentText: string | null;
}
