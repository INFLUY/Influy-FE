import { ApiResponse } from '@/types/common/ApiResponse.types';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { PresignedUrlResponse } from '@/types/common/PresignedUrl.types';

export const postPresignedUrl = async (
  imgName: string
): Promise<ApiResponse<PresignedUrlResponse>> => {
  const response = await instance.post(
    generateApiPath(API_DOMAINS.PRESIGNED_URL),
    { imgName }
  );
  return response.data;
};
