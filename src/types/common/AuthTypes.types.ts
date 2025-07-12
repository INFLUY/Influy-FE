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
  intersetedCategories: number[];
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
}

export interface UserSignup {
  userInfo: {
    username: string;
    kakaoId: number;
    name: string; // 이게 왜 필요??
    nickname: string; // 이게 왜 필요??
    intersetedCategories: number[];
  };
}

export interface SellerSignup {
  userInfo: {
    username: string;
    kakaoId: number;
    name: string; // 이게 왜 필요??
    nickname: string; // 이게 왜 필요??
  };
  email?: string;
  instagram: string;
  youtube?: string;
  tiktok?: string;
}
