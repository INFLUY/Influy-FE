interface BaseCategory {
  id: number;
}

export interface CategoryType extends BaseCategory {
  category: string;
  categoryOrder?: number;
}

export interface ItemCategoryType extends BaseCategory {
  name: string;
}

export interface ItemCategoryResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    categoryDtoList: ItemCategoryType[] | [];
  };
}
