import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

export const patchUsername = async ({
  data,
}: {
  data: {
    username: string;
  };
}) => {
  const response = await instance.patch(API_DOMAINS.HANDLE_USERNAME, data);
  return response.data.result;
};
