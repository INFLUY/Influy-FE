export interface ItemFormValues {
  titleText: string;
  selectedCategoryList: string[];
  hasStartDate: boolean;
  startISODateTime: string | null;
  hasEndDate: boolean;
  endISODateTime: string | null;
  summaryText: string | null;
  price: number;
  salePrice: number;
  linkText: string | null;
  period: number | null;
  commentText: string | null;
}
