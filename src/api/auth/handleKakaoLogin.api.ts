import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import {
  LoginedUserAuthResponse,
  RegisterAuthResponse,
} from '@/types/common/AuthTypes.types';

export const handleKakaoLogin = async (
  code: string
): Promise<RegisterAuthResponse | LoginedUserAuthResponse> => {
  const response = await instance.get(API_DOMAINS.OAUTH_KAKAO, {
    params: {
      code,
    },
  });
  return response.data;
};
