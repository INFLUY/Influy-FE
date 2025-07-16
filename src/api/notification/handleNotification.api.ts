import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { ApiResponse } from '@/types/common/ApiResponse.types';
import {
  BaseNotice,
  NoticeResponse,
  PrimaryNoticeResponse,
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
  const response = await instance.patch(
    generateApiPath(API_DOMAINS.SELLER_MY_ANNOUNCEMENT_DETAIL, {
      announcementId,
    }),
    data || {},
    { params: isPrimary !== undefined ? { isPrimary } : undefined }
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
}): Promise<NoticeResponse> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_ANNOUNCEMENT, { sellerId }),
    {
      params: { page, size },
    }
  );
  return response.data.result;
};

export const getPrimaryNotification = async ({
  sellerId,
}: {
  sellerId: number;
}): Promise<ApiResponse<PrimaryNoticeResponse>> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.SELLER_PRIMARY_ANNOUNCEMENT, { sellerId })
  );
  return response.data;
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
