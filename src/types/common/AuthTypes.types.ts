import { ReactNode } from 'react';

export type UserType = 'seller' | 'user';

export interface SelectUserButtonType {
  type: UserType;
  title: string;
  description: string;
  icon: ReactNode;
}
