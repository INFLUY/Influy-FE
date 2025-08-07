import BellIcon from '@/assets/icon/common/BellIcon.svg?react';
import { useSnackbarStore } from '@/store/snackbarStore';

export const NotificationButton = () => {
  const { showSnackbar } = useSnackbarStore();

  return (
    <button
      type="button"
      className="relative"
      aria-label="알림 바로가기 버튼"
      onClick={() => showSnackbar('곧 앱에서 만나요!')}
    >
      <BellIcon className="h-6 w-6 cursor-pointer" />
    </button>
  );
};
