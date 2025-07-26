export type CategoryType = {
  id: number;
  name: string;
};

export interface ItemCategoryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    categoryDtoList: CategoryType[] | [];
  };
}
