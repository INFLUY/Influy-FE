import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import {
  BaseNotice,
  NoticeType,
  PrimaryNoticeType,
} from '@/types/common/NoticeType.types';

export const postNotification = async ({ data }: { data: BaseNotice }) => {
  const response = await instance.post(
    API_DOMAINS.SELLER_MY_ANNOUNCEMENT,
    data
  );
  return response.data.result;
};

export const patchNotification = async ({
  data,
  announcementId,
  isPrimary,
}: {
  data?: BaseNotice;
  announcementId: number;
  isPrimary?: boolean;
}) => {
  const params: Record<string, any> = { data, announcementId };
  if (isPrimary !== undefined) {
    params.isPrimary = isPrimary;
  }
  const response = await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_MY_ANNOUNCEMENT_DETAIL, {
      announcementId,
    }),
    data || {},
    { params }
  );
  return response.data.result;
};

export const getNotification = async ({
  sellerId,
  page,
  size,
}: {
  sellerId: number;
  page: number;
  size: number;
}) => {
  const response = await instance.get<
    ApiResponse<Pagination<NoticeType[] | [], 'announcements'>>
  >(generateApiPath(API_DOMAINS.SELLER_ANNOUNCEMENT, { sellerId }), {
    params: { page, size },
  });
  return response.data.result;
};

export const getPrimaryNotification = async ({
  sellerId,
}: {
  sellerId: number;
}) => {
  const response = await instance.get<ApiResponse<PrimaryNoticeType>>(
    generateApiPath(API_DOMAINS.SELLER_PRIMARY_ANNOUNCEMENT, { sellerId })
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
