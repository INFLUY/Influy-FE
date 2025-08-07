import { useSnackbarStore } from '@/store/snackbarStore';
import { MARKET_DETAIL } from './generatePath';
import { generatePath } from 'react-router-dom';

export const useCopyUrl = () => {
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

export const useCopyMarketUrl = (sellerId: number | null) => {
  const { showSnackbar } = useSnackbarStore();
  const copyMarketUrl = async () => {
    try {
      if (sellerId === null) throw new Error();
      await navigator.clipboard.writeText(
        window.location.origin +
          generatePath(MARKET_DETAIL, { marketId: sellerId })
      );
      showSnackbar('링크가 클립보드에 복사되었습니다.');
    } catch {
      showSnackbar('링크 복사에 실패했습니다.');
    }
  };

  return copyMarketUrl;
};
