export const PATH = {
  ROOT: '/',
  LOGIN: {
    base: '/login',
  },
  REGISTER: {
    base: '/join',
    type: {
      base: 'type',
      user: {
        base: 'user',
        id: 'id',
        interest: 'interest',
      },
      seller: {
        base: 'influencer',
        id: 'id',
        sns: 'sns',
        email: 'email',
      },
    },
  },
  WELCOME: {
    base: '/welcome',
  },
  HOME: {
    base: '/home',
    more: {
      endingSoon: 'ending-soon',
      // trending: 'trending',
      category: 'category',
    },
  },
  LIKED: {
    base: '/liked',
  },
  CALENDAR: {
    base: '/calendar',
  },
  MY: {
    base: '/my',
  },
  MARKET: {
    base: '/market',
    tabs: {
      selection: 'selection',
      review: 'review',
    },
  },
  SELLER: {
    base: '/influencer',
    home: {
      base: 'home',
    },
    my: {
      base: 'my-market',
      tabs: {
        selection: 'selection',
        stored: 'stored',
        review: 'review',
      },
      notice: {
        base: 'notice',
      },
      profile: {
        base: 'profile',
        edit: 'edit',
      },
    },
    item: {
      base: 'item',
      registration: {
        base: 'new',
      },
      administration: {
        base: ':itemId',
        itemDetail: {
          archived: 'archived',
          published: 'published',
        },
        edit: {
          base: 'edit',
          tabs: {
            info: 'info',
            faq: 'faq',
          },
        },
      },
      faq: {
        base: 'faq',
        registration: {
          base: 'new',
          question: 'question',
          answer: 'answer',
        },
        administration: {
          base: ':faqId',
          faqDetail: {
            edit: 'edit',
          },
        },
      },
    },
  },
} as const;
