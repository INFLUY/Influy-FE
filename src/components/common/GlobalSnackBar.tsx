import SnackBar from '@/components/common/SnackBar';
import { useSnackbarStore } from '@/store/snackbarStore';

const GlobalSnackBar = () => {
  const { hideSnackbar, message } = useSnackbarStore();

  if (!message) return null;

  return <SnackBar handleSnackBarClose={hideSnackbar}>{message}</SnackBar>;
};

export default GlobalSnackBar;
