import {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';
import { useAuthStore } from '@/store/authStore';
import { PATH } from '@/routes/path';
import { API_DOMAINS } from '@/constants/api';

let isRefreshing = false; // 리프레시 토큰이 갱신 중인지
const MAX_RETRIES = 3; // 최대 재시도 횟수
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    error ? reject(error) : resolve(token!);
  });
  failedQueue = [];
};

type ReissueResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    sellerId?: number;
    memberId: number;
    accessToken: string;
  };
};

interface RetryConfig extends AxiosRequestConfig {
  _retry?: number;
}

export const setupInterceptors = (instance: AxiosInstance) => {
  // 요청 인터셉터
  instance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (accessToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터
  instance.interceptors.response.use(
    // 성공 응답 처리
    (response: AxiosResponse) => response,
    // 에러 응답 처리
    async (error: AxiosError) => {
      const originalRequest = error.config as RetryConfig;
      const status = error.response?.status;

      const retryCount = originalRequest._retry || 0; // 재시도 횟수 확인

      // 401 에러 (토큰 만료) 시 재발급 시도
      if (status === 401 && retryCount < MAX_RETRIES) {
        originalRequest._retry = retryCount + 1;

        // 토큰 갱신 중이면 큐에 대기
        if (isRefreshing) {
          return new Promise<string>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return instance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        isRefreshing = true;

        try {
          const response = await instance.post<ReissueResponse>(
            API_DOMAINS.REISSUE,
            {},
            {
              withCredentials: true,
            } as RetryConfig
          );

          const data = response.data;

          if (!data.isSuccess || !data.result?.accessToken) {
            throw new Error('토큰 갱신에 실패했습니다.');
          }

          const newAccessToken = data.result.accessToken;

          // 상태에 accessToken 저장
          useAuthStore.getState().setAuthInfo({
            accessToken: newAccessToken,
            memberId: data.result.memberId,
            sellerId: data.result.sellerId ?? null,
          });

          // 대기 중인 요청들 처리
          processQueue(null, newAccessToken);

          // 원래 요청에 새 토큰 설정
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          }

          return instance(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          useAuthStore.getState().clearAuthInfo();

          if (window.location.pathname !== PATH.LOGIN.BASE) {
            window.location.replace(PATH.LOGIN.BASE);
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      // 재시도 횟수 초과한 401 에러 처리 -> 로그인 페이지로 이동
      if (status === 401 && retryCount >= MAX_RETRIES) {
        console.warn('다시 로그인해주세요.'); // TODO: 스낵바로 변경
        useAuthStore.getState().clearAuthInfo();
        window.location.replace(PATH.LOGIN.BASE);
        return Promise.reject(error);
      }

      if (status === 403) {
        // 권한 문제는 토큰이 유효할 수 있음
        console.warn('접근 권한이 없습니다.'); // TODO: 스낵바로 변경
        return Promise.reject(error);
      }

      // 기타 에러 그대로 전달
      return Promise.reject(error);
    }
  );
};
