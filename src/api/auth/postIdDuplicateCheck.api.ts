import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';

export const postIdDuplicateCheck = async ({
  username,
}: {
  username: string;
}) => {
  const response = await instance.post(API_DOMAINS.ID_DUPLICATE_CHECK, {
    username: '@' + username,
  });
  return response.data;
};
