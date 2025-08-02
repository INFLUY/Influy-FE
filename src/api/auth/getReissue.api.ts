import { API_DOMAINS } from '@/constants/api';
import { axiosBase } from '@/api/axiosInstance';
import { ApiResponse } from '@/types/common/ApiResponse.types';

interface ReissueResponse {
  sellerId?: number;
  memberId: number;
  accessToken: string;
}

export const getReissue = async () => {
  const response = await axiosBase.get<ApiResponse<ReissueResponse>>(
    API_DOMAINS.REISSUE
  );
  return response.data;
};
