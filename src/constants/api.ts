export const ACCESS_TOKEN_KEY = 'InfluyAccessToken';

export const API_DOMAINS = {
  //common
  SELLER_ANNOUNCEMENT: '/seller/:sellerId/announcements',
  SELLER_PRIMARY_ANNOUNCEMENT:
    '/seller/:sellerId/announcements/primary-announcement',

  // seller
  SELLER_MY_JOIN: 'register/seller',
  SELLER_MY_ANNOUNCEMENT: '/seller/announcements',
  SELLER_MY_ANNOUNCEMENT_DETAIL: '/seller/announcements/:announcementId',

  // user
  USER_JOIN: 'register/user',
};

export const SELLER_API_DOMAINS = {
  // 셀러 아이템
  ITEM_OVERVIEW: '/seller/:sellerId/items/:itemId/item-overview',
  TALKBOX_OPENED_ITEMS: '/seller/talkbox/opened',

  // 질문 카테고리
  SELLER_QUESTION_CATEGORY:
    '/seller/:sellerId/items/:itemId/question-categories',

  // [톡박스] 질문 관리
  SELLER_ALL_QUESTIONS_IN_CATEGORY:
    '/seller/item/talkbox/:questionCategoryId/questions',

  // [톡박스] 질문 카테고리
  SELLER_GENERATE_QUESTION_CATEGORY:
    '/seller/items/:itemId/question-categories/generate',
  SELLER_ADD_QUESTION_CATEGORIES: '/seller/items/:itemId/question-categories',

  // [톡박스] 셀러 톡박스 답변
  SELLER_TALKBOX_OPEN_STATUS: '/seller/items/:itemId/talkbox/open-status',
};

export const QUERY_KEYS = {
  // seller
  SELLER_ANNOUNCEMENT: 'sellerMyAnnouncements',
  SELLER_PRIMARY_ANNOUNCEMENT: 'sellerMyPrimaryAnnouncement',
  SELLER_ITEM_OVERVIEW: 'sellerItemOverview',
  SELLER_QUESTION_CATEGORY: 'sellerQuestionCategory',
  SELLER_QUESTION_BY_TAG: 'sellerQuestionByTag',
  SELLER_GENERATE_QUESTION_CATEGORY: 'sellerGenerateQuestionCategory',
  SELLER_TALKBOX_OPEN_STATUS: 'sellerTalkBoxOpenStatus',
  SELLER_ADD_QUESTION_CATEGORIES: 'sellerAddQuestionCategories',
  SELLER_TALKBOX_OPENED_ITEMS: 'sellerTalkBoxOpenedItems',
  SELLER_ALL_QUESTIONS_IN_CATEGORY: 'sellerAllQuestionsInCategory',
};
