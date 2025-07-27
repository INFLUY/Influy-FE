import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

interface ReissueResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result?: {
    sellerId?: number;
    memberId: number;
    accessToken: string;
  };
}

export const getReissue = async () => {
  const response = await instance.get<ReissueResponse>(API_DOMAINS.REISSUE, {});
  return response.data;
};
