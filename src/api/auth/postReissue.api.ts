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

export const postReissue = async () => {
  const response = await instance.post<ReissueResponse>(
    API_DOMAINS.REISSUE,
    {},
    { withCredentials: true }
  );
  return response.data;
};
