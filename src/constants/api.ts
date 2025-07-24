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
  ITEM_OVERVIEW: '/seller/:sellerId/items/:itemId/item-overview',

  // 질문 카테고리
  SELLER_QUESTION_CATEGORY:
    '/seller/:sellerId/items/:itemId/question-categories',

  // 톡박스 질문 관리
  SELLER_QUESTION_BY_TAG: '/seller/items/:itemId/talkbox/:questionTagId',
};

export const QUERY_KEYS = {
  // seller
  SELLER_ANNOUNCEMENT: 'sellerMyAnnouncements',
  SELLER_PRIMARY_ANNOUNCEMENT: 'sellerMyPrimaryAnnouncement',
  SELLER_ITEM_OVERVIEW: 'sellerItemOverview',
  SELLER_QUESTION_CATEGORY: 'sellerQuestionCategory',
  SELLER_QUESTION_BY_TAG: 'sellerQuestionByTag',
};
