export interface SellerProfileType {
  id: number;
  sellerId: number;
  username: string;
  nickname: string;
  backgroundImg: string | null;
  profileImg: string | null;
  instagram: string;
  tiktok: string | null;
  youtube: string | null;
  email: string | null;
}

export interface SellerMarketType {
  sellerProfile: SellerProfileType;
  isPublic: boolean;
  isLiked: boolean;
  publicItemCnt: number;
  reviews: number;
}

export interface SellerMyMarketType extends SellerMarketType {
  privateItemCnt: number;
}
