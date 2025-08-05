import { ApiResponse, Pagination } from '@/types/common/ApiResponse.types';
import { instance } from '@/api/axiosInstance';
import { generateApiPath } from '@/api/utils';
import { API_DOMAINS } from '@/constants/api';
import { TalkboxType } from '@/types/common/TalkboxType.types';

export const getUserQuesionList = async ({
  page,
  size,
}: {
  page: number;
  size: number;
}) => {
  const response = await instance.get<
    ApiResponse<Pagination<TalkboxType[] | [], 'talkboxList'>>
  >(generateApiPath(API_DOMAINS.USER_ITEM_TALKBOX_LIST), {
    params: { page, size },
  });
  return response.data.result;
};
