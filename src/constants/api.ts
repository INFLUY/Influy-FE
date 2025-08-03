export const ACCESS_TOKEN_KEY = 'InfluyAccessToken';

export const API_DOMAINS = {
  //common
  PRESIGNED_URL: '/image/presigned-url',
  OAUTH_KAKAO: '/oauth/kakao',
  REISSUE: '/member/auth/reissue',
  ID_DUPLICATE_CHECK: '/member/register/duplicate-check',
  SELLER_ANNOUNCEMENT: '/seller/:sellerId/announcements',
  SELLER_PRIMARY_ANNOUNCEMENT:
    '/seller/:sellerId/announcements/primary-announcement',
  SELLER_MARKET_LINKS: '/seller/:sellerId/market-links',
  SELLER_MARKET_LIKES: '/seller/:sellerId/count-likes',
  SELLER_MARKET_ITEMS: '/seller/:sellerId/items',
  SELLER_MARKET_ITEM: '/seller/:sellerId/items/:itemId',
  SELLER_FAQ_CATEGORIES: '/seller/:sellerId/items/:itemId/faq-categories',

  ITEM_CATEGORIES: '/categories',

  // seller
  SELLER_MY_JOIN: '/member/register/seller',
  SELLER_MY_ANNOUNCEMENT: '/seller/announcements',
  SELLER_MY_ANNOUNCEMENT_DETAIL: '/seller/announcements/:announcementId',
  SELLER_MY_POST_MARKET_LINKS: '/seller/market-links',
  SELLER_MY_HANDLE_MARKET_LINKS: '/seller/market-links/:linkId',
  SELLER_MY_POST_FAQ_CARD: '/seller/items/:itemId/faq',
  SELLER_MY_HANDLE_FAQ_CARD: '/seller/items/:itemId/faq/:faqCardId',
  SELLER_MY_GET_FAQ_CARD_DETAIL:
    '/seller/:sellerId/items/:itemId/faq/:faqCardId',

  // user
  USER_JOIN: '/member/register/user',
};

export const SELLER_API_DOMAINS = {
  // [톡박스] 셀러 톡박스 답변
  SELLER_ANSWER: '/seller/items/:itemId/talkbox/:questionCategoryId/answers',
  POST_INDIVIDUAL_ANSWER:
    '/seller/items/:itemId/talkbox/:questionCategoryId/questions/:questionTagId/:questionId/answers',

  // 셀러 아이템
  ITEM_OVERVIEW: '/seller/:sellerId/items/:itemId/item-overview',
  TALK_BOX_OPENED_ITEMS: '/seller/talkbox/opened',
  SELLER_TALK_BOX_OPEN_STATUS: '/seller/items/:itemId/talkbox/open-status',
  SELLER_TALK_BOX_COMMENT: '/seller/items/:itemId/talkbox/view-comment',
  PATCH_TALK_BOX_DEFAULT_COMMENT:
    '/seller/items/:itemId/talkbox/default-comment',

  // [톡박스] 질문 관리
  SELLER_ALL_QUESTIONS_IN_CATEGORY:
    '/seller/item/talkbox/:questionCategoryId/questions',
  SELLER_QUESTIONS_BY_TAG:
    '/seller/item/talkbox/items/question-categories/:questionTagId/questions',
  SELLER_DELETE_QUESTIONS_IN_CATEGORY:
    '/seller/items/:itemId/talkbox/:questionCategoryId/questions',
  GET_SINGLE_QUESTION_ANSWER:
    '/seller/items/:itemId/talkbox/:questionCategoryId/questions/:questionTagId/:questionId',

  // [톡박스] 질문 카테고리
  SELLER_GENERATE_QUESTION_CATEGORY:
    '/seller/items/:itemId/question-categories/generate',
  SELLER_ADD_QUESTION_CATEGORIES: '/seller/items/:itemId/question-categories',
  SELLER_CATEGORY_QUESTION_COUNTS: '/seller/items/talkbox/:questionCategoryId',
  SELLER_CATEGORY_LIST: '/seller/items/:itemId/talkbox/question-categories',

  //[톡박스] 질문태그(소분류)
  SELLER_TALK_BOX_CATEGORY_TAGS:
    '/seller/item/talkbox/:questionCategoryId/tags',
};

export const QUERY_KEYS = {
  SELLER_ANNOUNCEMENT: 'sellerAnnouncements',
  SELLER_PRIMARY_ANNOUNCEMENT: 'sellerPrimaryAnnouncement',
  SELLER_MARKET_LINKS: 'sellerMarketLinks',
  SELLER_MARKET_LIKES: 'sellerMarketLikes',
  SELLER_MARKET_ITEMS: 'sellerMarketItems',
  SELLER_MARKET_ITEM: 'sellerMarketItem',
  SELLER_FAQ_CATEGORIES: 'sellerFaqCategories',
  SELLER_FAQ_CARD: 'sellerFaqCard',
  ID_DUPLICATE_CHECK: 'checkId',

  ITEM_CATEGORIES: 'itemCategories',
  SELLER_ITEM_OVERVIEW: 'sellerItemOverview',
  SELLER_GENERATE_QUESTION_CATEGORY: 'sellerGenerateQuestionCategory',
  SELLER_TALK_BOX_OPEN_STATUS: 'sellerTalkBoxOpenStatus',
  SELLER_ADD_QUESTION_CATEGORIES: 'sellerAddQuestionCategories',
  SELLER_TALK_BOX_OPENED_ITEMS: 'sellerTalkBoxOpenedItems',
  SELLER_ALL_QUESTIONS_IN_CATEGORY: 'sellerAllQuestionsInCategory',
  SELLER_TALK_BOX_CATEGORY_TAGS: 'sellerTalkBoxCategoryTags',
  SELLER_QUESTIONS_BY_TAG: 'sellerQuestionsByTag',
  SELLER_CATEGORY_QUESTION_COUNTS: 'sellerCategoryQuestionCounts',
  SELLER_CATEGORY_LIST: 'sellerCategoryList',
  SELLER_DELETE_QUESTIONS_IN_CATEGORY: 'sellerDeleteQuestionsInCategory',
  SELLER_QUESTION_TAGS: 'sellerQuestionTags',
  SELLER_TAG_ANSWER_LIST: 'sellerTagAnswerList',
  SELLER_TALK_BOX_COMMENT: 'sellerTalkBoxComment',
  SELLER_POST_INDIVIDUAL_ANSWER: 'sellerPostIndividualAnswer',
  SELLER_SINGLE_QUESTION_ANSWER: 'sellerSingleQuestionAnswer',
};
