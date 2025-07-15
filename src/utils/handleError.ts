import { useErrorStore } from '@/store/errorStore';

export const handleReactQueryError = (error: unknown) => {
  const { showError } = useErrorStore.getState();

  const message =
    error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.';
  showError(message);
};
