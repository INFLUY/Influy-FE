import { ErrorContent } from '@/components';
import { UIError } from '@/libs/error/UIError';
import { PATH } from '@/routes/path';
import { FallbackProps } from 'react-error-boundary';

const ErrorPage = ({ error }: FallbackProps) => {
  const getErrorConfig = () => {
    const status = error?.status || error?.response?.status;
    const message = error?.message;

    if (error instanceof UIError || message) {
      return {
        message,
        buttonText: error?.buttonText || '홈으로 이동',
        onClickHandler:
          error?.onClickHandler ||
          (() => window.location.replace(PATH.HOME.base)),
      };
    }

    switch (status) {
      case 400:
        return {
          message: '잘못된 요청입니다.\n요청 내용을 확인해주세요.',
          buttonText: '홈으로 이동',
          onClickHandler: () => window.location.replace(PATH.HOME.base),
        };
      case 401:
        return {
          message: '인증되지 않은 사용자입니다.\n로그인 후 다시 시도해주세요.',
          buttonText: '로그인',
          onClickHandler: () => window.location.replace(PATH.LOGIN.base),
        };
      case 403:
        return {
          message: '접근 권한이 없습니다.\n권한을 확인해주세요.',
          buttonText: '홈으로 이동',
          onClickHandler: () => window.location.replace(PATH.HOME.base),
        };
      case 404:
        return {
          message:
            '요청한 데이터를 찾을 수 없습니다.\n삭제되었거나 접근 권한이 없을 수 있습니다.',
          buttonText: '홈으로 이동',
          onClickHandler: () => window.location.replace(PATH.HOME.base),
        };
      case 500:
        return {
          message: '서버에 문제가 발생했습니다.\n잠시 후 다시 시도해주세요.',
          buttonText: '다시 시도',
          onClickHandler: () => window.location.reload(),
        };
      default:
        return {
          message:
            '알 수 없는 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.',
          buttonText: '다시 시도',
          onClickHandler: () => window.location.reload(),
        };
    }
  };

  const { message, buttonText, onClickHandler } = getErrorConfig();

  return (
    <div className="flex h-dvh items-center justify-center px-10">
      <ErrorContent
        message={message}
        buttonText={buttonText}
        onClickHandler={onClickHandler}
      />
    </div>
  );
};

export default ErrorPage;
