import { API_DOMAINS } from '@/constants/api';
import { instance } from '@/api/axiosInstance';
import { SellerPickType } from '@/types/user/Home.types';
import { generateApiPath } from '../utils';

export const getSellerPick = async ({
  sellerId,
}: {
  sellerId: number;
}): Promise<SellerPickType> => {
  const response = await instance.get(
    generateApiPath(API_DOMAINS.HOME_SELLER_PICK, { sellerId })
  );
  return response.data.result;
};
