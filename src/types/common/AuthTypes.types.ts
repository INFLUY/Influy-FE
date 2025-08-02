import { ReactNode } from 'react';

export type UserType = 'influencer' | 'user';

export interface SelectUserButtonType {
  type: UserType;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface UserSignupState {
  id: string;
  email: string;
  interestedCategories: number[];
}

export interface SnsLinkProps {
  instagram: string;
  youtube: string;
  tiktok: string;
}

export interface SellerSignupState {
  id: string;
  email: string;
  sns: SnsLinkProps;
  interestedCategories: number[];
}

export interface UserSignup {
  username: string;
  kakaoId: number;
  interestedCategories: number[];
}

export interface SellerSignup {
  userInfo: {
    username: string;
    kakaoId: number;
    interestedCategories: number[];
  };
  email?: string;
  instagram: string;
  youtube?: string;
  tiktok?: string;
}

export interface RegisterResult {
  kakaoId: number;
}

export interface LoginedUserResult {
  accessToken: string;
  memberId: number;
  sellerId?: number;
}
