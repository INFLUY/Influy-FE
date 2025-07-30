import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import { UserProfileType } from '@/types/user/UserProfile';
import { generateApiPath } from '@/api/utils';

export const getUserProfile = async ({
  memberId,
}: {
  memberId: number;
}): Promise<ApiResponse<UserProfileType>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.USER_MY_PROFILE, { memberId })
  );
  return response.data;
};
