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
    tabs: {
      selection: 'selection',
      stored: 'stored',
      review: 'review',
    },
  },
} as const;
