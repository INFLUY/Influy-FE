import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { LoadingSpinner } from '@/components';
import { useKakaoLogin } from '@/services/auth/query/useKakaoLogin';

export const KakaoLoginHandler = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const didRun = useRef(false);

  const { mutate } = useKakaoLogin();

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return (
    <div className="relative flex flex-1 items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};
