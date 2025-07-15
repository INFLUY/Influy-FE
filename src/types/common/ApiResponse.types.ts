export type ApiResponse<T> = {
  code: string;
  isSuccess: boolean;
  message: string;
  result?: T;
};
