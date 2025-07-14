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
    profile: {
      base: 'profile',
      edit: 'edit',
    },
    items: {
      base: 'item',
      item: {
        registration: { base: 'new', tabs: { info: 'info', faq: 'faq' } },
        administration: {
          base: ':itemId',
          itemDetail: {
            archived: 'archived',
            published: 'published',
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
    },
    home: {
      base: 'home',
      more: {
        endingSoon: 'ending-soon',
        trending: 'trending',
        category: 'category',
      },
    },
    talkBox: {
      base: 'talk-box',
      list: 'list',
      item: {
        base: 'item/:itemId',
        category: {
          base: 'category',
          selected: {
            base: ':categoryId',
            bulkReply: 'bulk-reply',
          },
        },
        setting: 'setting',
      },
    },
  },
} as const;
