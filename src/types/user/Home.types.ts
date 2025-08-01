export interface SellerThumbnailListType {
  sellerThumbnailList: SellerThumbnailType[] | [];
}

export interface SellerThumbnailType {
  sellerId: number;
  profileImg: string;
  sellerUsername: string;
  sellerNickname: string;
}

export interface SellerPickType {
  sellerId: number;
  sellerNickname: string;
  mainImgList: [
    {
      itemId: number;
      mainImg: string;
    },
  ];
}
