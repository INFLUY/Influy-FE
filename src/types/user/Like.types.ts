export interface LikeType {
  targetType: LikeTargetType;
  targetId: number;
  likeCnt: number;
}

export interface LikeItemResponse {
  likeId: number;
  memberId: number;
  targetType: LikeTargetType;
  likeStatus: LikeStatusType;
  itemId: number;
  itemName: string;
}

type LikeTargetType = 'SELLER' | 'ITEM';
type LikeStatusType = 'LIKE' | 'UNLIKE';

export interface SellerLikeList {
  sellerId: number;
  nickName: string;
  userName: string;
  profileImgLink: string;
  likeCnt: number;
}

export interface LikedInfluencerListType {
  sellerId: number;
  nickName: string;
  userName: string;
  profileImgLink: string;
  likeCnt: number;
}
