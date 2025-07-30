import { useSnackbarStore } from '@/store/snackbarStore';

const useCopyUrl = () => {
  const { showSnackbar } = useSnackbarStore();
  const useCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSnackbar('링크가 클립보드에 복사되었습니다.');
    } catch {
      showSnackbar('링크 복사에 실패했습니다.');
    }
  };
  return useCopyUrl;
};

export default useCopyUrl;
