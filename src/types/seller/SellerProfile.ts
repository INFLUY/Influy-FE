export interface SellerProfileEditValues {
  backgroundImg: string | null;
  profileImg: string | null;
  nickname: string;
  instagram: string | null;
  youtube: string | null;
  tiktok: string | null;
  email: string;
  isPublic: boolean;
}

export interface SellerProfile extends SellerProfileEditValues {
  id: number;
  itemSortType: string;
}
