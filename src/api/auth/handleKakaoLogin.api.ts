import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

export const handleKakaoLogin = async (code: string) => {
  const response = await instance.get(API_DOMAINS.OAUTH_KAKAO, {
    params: {
      code,
    },
  });
  return response.data;
};
