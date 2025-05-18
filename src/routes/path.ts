export const PATH = {
  ROOT: '/',
  HOME: {
    base: '/home',
  },
  SELLER_PROFILE: {
    base: '/seller/:sellerId',
  },
  SELLER: {
    base: '/my',
    mypage: {
      profile: 'profile',
    },
  },
} as const;
