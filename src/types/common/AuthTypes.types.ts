import { ReactNode } from 'react';

export type UserType = 'influencer' | 'user';

export interface SelectUserButtonType {
  type: UserType;
  title: string;
  description: string;
  icon: ReactNode;
}
