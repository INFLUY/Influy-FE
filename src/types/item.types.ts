export interface ItemFormValues {
  images: string[];
  titleText: string;
  selectedCategoryList: number[];
  hasStartDate: boolean;
  startISODateTime: string | undefined;
  hasEndDate: boolean;
  endISODateTime: string | undefined;
  summaryText: string;
  price: number | undefined;
  salePrice: number | undefined;
  linkText: string | undefined;
  period: number | undefined;
  commentText: string | undefined;
}
