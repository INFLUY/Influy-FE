import { useSnackbarStore } from '@/store/snackbarStore';

export const useHandleReactQueryError = (error: unknown) => {
  const { showSnackbar } = useSnackbarStore();

  const message =
    error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
  showSnackbar(message, 'error');
};
