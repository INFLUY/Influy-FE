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
    edit: {
      base: 'edit-profile',
    },
    items: {
      base: 'item',
      item: {
        registration: 'new',
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
  },
} as const;
