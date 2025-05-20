export const PATH = {
  ROOT: '/',
  HOME: {
    base: '/home',
  },
  SELLER_PROFILE: {
    base: '/seller/:sellerId',
    tabs: {
      selection: 'selection',
      review: 'review',
    },
  },
  SELLER: {
    base: '/my',
    mypage: {
      profile: 'profile',
    },
  },
} as const;
