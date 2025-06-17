import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { NoticePostType } from '@/types/common/NoticeType.types';

export const postNotification = async ({ data }: { data: NoticePostType }) => {
  const response = await instance.post(
    API_DOMAINS.SELLER_MY_ANNOUNCEMENT,
    data
  );
  return response.data.result;
};

export const getNotification = async () => {
  const response = await instance.get(API_DOMAINS.SELLER_MY_ANNOUNCEMENT);
  return response.data.result;
};

export const deleteNotification = async ({
  announcementId,
}: {
  announcementId: number;
}) => {
  const response = await instance.delete(
    generateApiPath(API_DOMAINS.SELLER_MY_ANNOUNCEMENT_DETAIL, {
      announcementId,
    })
  );
  return response.data.result;
};
