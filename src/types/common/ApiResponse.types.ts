export type ApiResponse<T> = {
  code: string;
  isSuccess: boolean;
  message: string;
  result?: T;
};

export type Pagination<T, K extends string> = {
  [key in K]: T;
} & {
  listSize: number;
  totalPage: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
};

export interface PaginationType {
  page: number;
  size: number;
}
