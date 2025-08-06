export interface LikeType {
  targetType: LikeTargetType;
  targetId: number;
  likeCnt: number;
  liked: boolean;
}

export interface LikeItemResponse {
  likeId: number;
  memberId: number;
  targetType: 'ITEM';
  likeStatus: LikeStatusType;
  itemId: number;
  itemName: string;
}

export interface LikeSellerResponse {
  likeId: number;
  memberId: number;
  targetType: 'SELLER';
  likeStatus: LikeStatusType;
  sellerId: number;
  sellerName: string;
}

type LikeTargetType = 'SELLER' | 'ITEM';
type LikeStatusType = 'LIKE' | 'UNLIKE';

export interface SellerLikeList {
  sellerId: number;
  nickName: string;
  userName: string;
  profileImgLink: string;
  likeCnt: number;
  liked: boolean;
}
