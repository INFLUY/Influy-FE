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
  // [톡박스] 셀러 톡박스 답변
  SELLER_TAG_ANSWER_LIST:
    '/seller/items/:itemId/talkbox/:questionCategoryId/answers',

  // 셀러 아이템
  ITEM_OVERVIEW: '/seller/:sellerId/items/:itemId/item-overview',
  TALKBOX_OPENED_ITEMS: '/seller/talkbox/opened',
  SELLER_TALKBOX_OPEN_STATUS: '/seller/items/:itemId/talkbox/open-status',

  // [톡박스] 질문 관리
  SELLER_ALL_QUESTIONS_IN_CATEGORY:
    '/seller/item/talkbox/:questionCategoryId/questions',
  SELLER_QUESTIONS_BY_TAG:
    '/seller/item/talkbox/items/question-categories/:questionTagId/questions',
  SELLER_DELETE_QUESTIONS_IN_CATEGORY:
    '/seller/items/:itemId/talkbox/:questionCategoryId/questions',

  // [톡박스] 질문 카테고리
  SELLER_GENERATE_QUESTION_CATEGORY:
    '/seller/items/:itemId/question-categories/generate',
  SELLER_ADD_QUESTION_CATEGORIES: '/seller/items/:itemId/question-categories',
  SELLER_CATEGORY_QUESTION_COUNTS: '/seller/items/talkbox/:questionCategoryId',
  SELLER_CATEGORY_LIST: '/seller/items/:itemId/talkbox/question-categories',

  //[톡박스] 질문태그(소분류)
  SELLER_TALKBOX_CATEGORY_TAGS: '/seller/item/talkbox/:questionCategoryId/tags',
};

export const QUERY_KEYS = {
  // seller
  SELLER_ANNOUNCEMENT: 'sellerMyAnnouncements',
  SELLER_PRIMARY_ANNOUNCEMENT: 'sellerMyPrimaryAnnouncement',
  SELLER_ITEM_OVERVIEW: 'sellerItemOverview',
  SELLER_GENERATE_QUESTION_CATEGORY: 'sellerGenerateQuestionCategory',
  SELLER_TALKBOX_OPEN_STATUS: 'sellerTalkBoxOpenStatus',
  SELLER_ADD_QUESTION_CATEGORIES: 'sellerAddQuestionCategories',
  SELLER_TALKBOX_OPENED_ITEMS: 'sellerTalkBoxOpenedItems',
  SELLER_ALL_QUESTIONS_IN_CATEGORY: 'sellerAllQuestionsInCategory',
  SELLER_TALKBOX_CATEGORY_TAGS: 'sellerTalkBoxCategoryTags',
  SELLER_QUESTIONS_BY_TAG: 'sellerQuestionsByTag',
  SELLER_CATEGORY_QUESTION_COUNTS: 'sellerCategoryQuestionCounts',
  SELLER_CATEGORY_LIST: 'sellerCategoryList',
  SELLER_DELETE_QUESTIONS_IN_CATEGORY: 'sellerDeleteQuestionsInCategory',
  SELLER_QUESTION_TAGS: 'sellerQuestionTags',
  SELLER_TAG_ANSWER_LIST: 'sellerTagAnswerList',
};
