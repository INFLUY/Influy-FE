import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import {
  LoginedUserResult,
  RegisterResult,
} from '@/types/common/AuthTypes.types';
import { ApiResponse } from '@/types/common/ApiResponse.types';

export const handleKakaoLogin = async (
  code: string,
  redirectToLocal: boolean
) => {
  const response = await instance.get<
    ApiResponse<RegisterResult | LoginedUserResult>
  >(API_DOMAINS.OAUTH_KAKAO, {
    params: {
      code,
      redirectToLocal,
    },
  });
  if (!response.data.result) {
    throw new Error('카카오 로그인 실패');
  }
  return response.data.result;
};
