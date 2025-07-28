import SnackBar from '@/components/common/SnackBar';
import { useSnackbarStore } from '@/store/snackbarStore';

const GlobalSnackBar = () => {
  const { message, type, hideSnackbar } = useSnackbarStore();

  if (!message) return null;

  const getStyleByType = (type: 'error' | 'default') => {
    switch (type) {
      case 'error':
        return 'bg-main/90';
      default:
        return '';
    }
  };

  return (
    <SnackBar
      handleSnackBarClose={hideSnackbar}
      additionalStyles={getStyleByType(type)}
    >
      {message}
    </SnackBar>
  );
};

export default GlobalSnackBar;
