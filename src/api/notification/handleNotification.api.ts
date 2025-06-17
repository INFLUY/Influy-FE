import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '../utils';
import { API_DOMAINS } from '@/constants/api';
import { NoticePostType } from '@/types/common/NoticeType.types';

export const postNotification = async ({ data }: { data: NoticePostType }) => {
  const response = await instance.post(
    API_DOMAINS.SELLER_MY_ANNOUNCEMENT,
    data
  );
  return response.data.result;
};
