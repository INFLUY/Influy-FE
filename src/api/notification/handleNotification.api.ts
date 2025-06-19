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

export const patchNotification = async ({
  data,
  announcementId,
}: {
  data: NoticePostType;
  announcementId: number;
}) => {
  const response = await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_MY_ANNOUNCEMENT, { announcementId }),
    data
  );
  return response.data.result;
};

export const getNotification = async ({ sellerId }: { sellerId: number }) => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_ANNOUNCEMENT, { sellerId })
  );
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
