export const PATH = {
  ROOT: '/',
  HOME: {
    base: '/home',
  },
  USER: {
    base: '/market/:marketId',
    tabs: {
      selection: 'selection',
      review: 'review',
    },
  },
  SELLER: {
    base: '/my-market',
    tabs: {
      selection: 'selection',
      stored: 'stored',
      review: 'review',
    },
    notice: {
      base: 'notice',
    },
    items: {
      base: 'item',
      item: {
        registration: 'new',
      },
    },
  },
} as const;
