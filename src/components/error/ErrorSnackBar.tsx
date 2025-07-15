import { useErrorStore } from '@/store/errorStore';
import SnackBar from '@/components/common/SnackBar';

const GlobalSnackBar = () => {
  const { errorMessage, clearError } = useErrorStore();

  if (!errorMessage) return null;

  return <SnackBar handleSnackBarClose={clearError}>{errorMessage}</SnackBar>;
};

export default GlobalSnackBar;
