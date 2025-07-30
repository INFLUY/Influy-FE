import { ErrorContent } from '@/components';
import { PATH } from '@/routes/path';

const NotFound = () => {
  return (
    <div className="flex h-dvh flex-col items-center justify-center px-10">
      <div className="headline1 text-grey11">404 Error</div>
      <ErrorContent
        message="잘못된 경로입니다."
        buttonText="홈으로 가기"
        onClickHandler={() => window.location.replace(PATH.HOME.BASE)}
      />
    </div>
  );
};

export default NotFound;
