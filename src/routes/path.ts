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
        INTEREST: 'interest',
      },
    },
  },
  OAUTH: {
    BASE: '/oauth/kakao/callback',
  },
  WELCOME: {
    BASE: '/welcome',
  },
  HOME: {
    BASE: '/home',
    MORE: {
      ENDING_SOON: 'ending-soon',
      // trending: 'trending',
      CATEGORY: {
        BASE: 'category',
        DETAIL: ':categoryId',
      },
    },
  },
  SEARCH: {
    BASE: '/search',
  },
  LIKE: {
    BASE: '/like',
    TABS: {
      ITEM: 'item',
      SELLER: 'influencer',
    },
  },
  CALENDAR: {
    BASE: '/calendar',
  },
  MY: {
    BASE: '/mypage',
    MY_QUESTION: 'question',
    NOTIFICATION: 'notification',
    NICKNAME: 'nickname',
    ACCOUNT_SETTING: {
      BASE: 'account',
      ID: 'id',
      DELETE: 'delete',
    },
    SUPPORT: {
      BASE: 'support',
      FAQ: ':supportFaqId',
    },
  },
  MARKET: {
    BASE: '/market',
    DETAIL: {
      BASE: ':marketId',
      TABS: {
        SELECTION: 'selection',
        REVIEW: 'review',
      },
      ITEM: {
        BASE: 'item',
        ITEM_ID: ':itemId',
        TALK_BOX: 'talk-box',
      },
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
      PREVIEW: {
        BASE: 'preview',
        TABS: {
          SELECTION: 'selection',
        },
      },
      ANNOUNCEMENT: {
        BASE: 'announcement',
      },
      PROFILE: {
        BASE: 'profile',
        EDIT: 'edit',
      },
      SETTING: {
        BASE: 'settings',
        NOTIFICATION: 'notification',
        ACCOUNT_SETTING: {
          BASE: 'account',
          ID: 'id',
          DELETE: 'delete',
        },
        SUPPORT: {
          BASE: 'support',
          FAQ: ':supportFaqId',
        },
      },
    },
    ITEM: {
      BASE: 'item',
      REGISTRATION: {
        BASE: 'new',
      },
      ITEM_ID: {
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
        FAQ_ID: {
          BASE: ':faqId',
          FAQ_DETAIL: {
            EDIT: 'edit',
          },
        },
      },
    },
    TALK_BOX: {
      BASE: 'talk-box',
      LIST: 'list',
      ITEM: {
        BASE: 'item/:itemId',
        TABS: {
          PENDING: 'pending',
          ANSWERED: 'answered',
        },
        CATEGORY: {
          BASE: 'category/:categoryId',
          TABS: {
            PENDING: 'pending',
            ANSWERED: 'answered',
          },
          BULK_REPLY: 'bulk-reply',
        },
        SETTING: {
          BASE: 'setting',
          DEFAULT_MESSAGE: 'default-message',
        },
      },
      ONBOARDING: {
        BASE: 'onboarding/:itemId',
        START: 'start',
      },
    },
  },
} as const;
