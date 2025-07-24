export const PATH = {
  ROOT: '/',
  LOGIN: {
    BASE: '/login',
  },
  REGISTER: {
    BASE: '/join',
    TYPE: {
      BASE: 'type',
      USER: {
        BASE: 'user',
        ID: 'id',
        INTEREST: 'interest',
      },
      SELLER: {
        BASE: 'influencer',
        ID: 'id',
        SNS: 'sns',
        EMAIL: 'email',
      },
    },
  },
  WELCOME: {
    BASE: '/welcome',
  },
  HOME: {
    BASE: '/home',
    MORE: {
      ENDING_SOON: 'ending-soon',
      // trending: 'trending',
      CATEGORY: 'category',
    },
  },
  LIKED: {
    BASE: '/liked',
  },
  CALENDAR: {
    BASE: '/calendar',
  },
  MY: {
    BASE: '/my',
  },
  MARKET: {
    BASE: '/market',
    TABS: {
      SELECTION: 'selection',
      REVIEW: 'review',
    },
  },
  SELLER: {
    BASE: '/influencer',
    HOME: {
      BASE: 'home',
    },
    CALENDER: {
      BASE: 'calendar',
    },
    MY: {
      BASE: 'my-market',
      TABS: {
        SELECTION: 'selection',
        ARCHIVE: 'archive',
        REVIEW: 'review',
      },
      NOTICE: {
        BASE: 'notice',
      },
      PROFILE: {
        BASE: 'profile',
        EDIT: 'edit',
      },
    },
    ITEM: {
      BASE: 'item',
      REGISTRATION: {
        BASE: 'new',
      },
      ADMINISTRATION: {
        BASE: ':itemId',
        EDIT: {
          BASE: 'edit',
          TABS: {
            INFO: 'info',
            FAQ: 'faq',
          },
        },
      },
      FAQ: {
        BASE: 'faq',
        REGISTRATION: {
          BASE: 'new',
          QUERSTION: 'question',
          ANSWER: 'answer',
        },
        ADMINISTRATION: {
          BASE: ':faqId',
          FAQ_DETAIL: {
            EDIT: 'edit',
          },
        },
      },
    },
  },
} as const;
