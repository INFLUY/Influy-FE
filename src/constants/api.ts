export const ACCESS_TOKEN_KEY = 'InfluyAccessToken';

export const API_DOMAINS = {
  //common
  PRESIGNED_URL: '/image/presigned-url',
  OAUTH_KAKAO: '/oauth/kakao',
  REISSUE: '/member/auth/reissue',
  LOGOUT: '/member/logout',
  DELETE_ACCOUNT: '/member/delete',
  ID_DUPLICATE_CHECK: '/member/register/duplicate-check',
  SELLER_MARKET: '/user/:sellerId/market',
  SELLER_ANNOUNCEMENT: '/seller/:sellerId/announcements',
  SELLER_PRIMARY_ANNOUNCEMENT:
    '/seller/:sellerId/announcements/primary-announcement',
  SELLER_MARKET_ITEMS: '/seller/:sellerId/items',
  SELLER_MARKET_ITEM: '/seller/:sellerId/items/:itemId',
  SELLER_FAQ_CATEGORIES: '/seller/:sellerId/items/:itemId/faq-categories',

  //찜
  GET_ITEM_LIKE_COUNTS: '/seller/:sellerId/items/:itemId/count-likes',
  SELLER_MARKET_LINKS: '/seller/:sellerId/market-links',
  SELLER_MARKET_LIKES: '/seller/:sellerId/count-likes',

  ITEM_CATEGORIES: '/categories',

  // seller
  SELLER_MY_JOIN: '/member/register/seller',
  SELLER_MY_ANNOUNCEMENT: '/seller/announcements',
  SELLER_MY_ANNOUNCEMENT_DETAIL: '/seller/announcements/:announcementId',
  SELLER_MY_POST_MARKET_LINKS: '/seller/market-links',
  SELLER_MY_HANDLE_MARKET_LINKS: '/seller/market-links/:linkId',

  // [FAQ]셀러 faq 카드
  SELLER_MY_POST_FAQ_CARD: '/seller/items/:itemId/faq',
  SELLER_MY_HANDLE_FAQ_CARD: '/seller/items/:itemId/faq/:faqCardId',
  SELLER_MY_GET_FAQ_CARD_DETAIL:
    '/seller/:sellerId/items/:itemId/faq/:faqCardId', //각 faq 카드 조회
  GET_FAQ_CARDS: '/seller/:sellerId/items/:itemId/faq/faq-cards', // 카테고리별 FAQ 카드 리스트 조회

  // user
  USER_JOIN: '/member/register/user',
  USER_PROFILE: '/member/:memberId/profile',
  USER_MY_PROFILE: '/member/profile',

  // home
  HOME_RECOMMEND: '/home/recommend',
  HOME_POPULAR: '/home/popular',
  HOME_CLOSE_DEADLINE: '/home/close-deadline',
  HOME_TRENDING_SELLER: '/home/trending-seller',
  HOME_SELLER_PICK: '/home/:sellerId/pick',

  // like
  POST_ITEM_LIKE: '/seller/:sellerId/items/:itemId/likes',
  PATCH_ITEM_LIKE: '/seller/:sellerId/items/:itemId/dislikes',
  GET_LIKED_ITEM_LIST: '/home/item-likes',
  GET_LIKED_SELLER_LIST: '/home/seller-likes',

  // 질문 카테고리
  GET_TALK_BOX_CATEGORY: '/user/items/:itemId/talkbox/question-categories',

  //질문관리
  USER_POST_QUESTION: '/user/items/:itemId/talkbox/:questionCategoryId',

  //셀러
  GET_SELLER_OVERVIEW: '/seller/:sellerId/overview',
};

export const SELLER_API_DOMAINS = {
  // [홈] 셀러 홈
  SELLER_MY_HOME_QUESTIONS: '/seller/home/questions',

  // [셀러] 셀러 프로필 및 마켓
  SELLER_MY_PROFILE: '/seller/profile',
  SELLER_MY_MARKET: '/seller/my-market',

  // [톡박스] 셀러 톡박스 답변
  SELLER_ANSWER: '/seller/items/:itemId/talkbox/:questionCategoryId/answers',
  POST_INDIVIDUAL_ANSWER:
    '/seller/items/:itemId/talkbox/:questionCategoryId/questions/:questionTagId/:questionId/answers',

  // 셀러 아이템
  ITEM_OVERVIEW: '/seller/:sellerId/items/:itemId/item-overview',
  SELLER_ITEM_SORT: '/seller/item-sort',
  SELLER_ITEM_STATUS: '/seller/items/:itemId/status',
  SELLER_POST_ITEM: '/seller/items',
  SELLER_HANDLE_ITEM: '/seller/items/:itemId',
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
  SELLER_MARKET: 'sellerMarket',
  SELLER_MARKET_LINKS: 'sellerMarketLinks',
  SELLER_MARKET_LIKES: 'sellerMarketLikes',
  SELLER_MARKET_ITEMS: 'sellerMarketItems',
  SELLER_MARKET_ITEM: 'sellerMarketItem',
  SELLER_FAQ_CATEGORIES: 'sellerFaqCategories',
  SELLER_FAQ_CARD: 'sellerFaqCard',
  ID_DUPLICATE_CHECK: 'checkId',

  ITEM_CATEGORIES: 'itemCategories',

  // 셀러
  SELLER_MY_PROFILE: 'sellerMyProfile',
  SELLER_MY_MARKET: 'sellerMyMarket',
  SELLER_MY_HOME_QUESTIONS: 'sellerMyHomeQuestions',
  SELLER_OVERVIEW: 'sellerOverview',

  USER_PROFILE: 'userProfile',

  HOME_RECOMMEND: 'homeRecommend',
  HOME_POPULAR: 'homePopular',
  HOME_CLOSE_DEADLINE: 'closeDeadline',
  HOME_TRENDING_SELLER: 'trendingSeller',
  HOME_SELLER_PICK: 'sellerPick',

  //찜
  LIKED_ITEMS: 'likedItems',
  LIKED_SELLERS: 'likedSellers',
  ITEM_LIKE_COUNTS: 'getItemLikeCounts',

  // 질문 카테고리
  TALK_BOX_CATEGORY: 'talkBoxCategory',

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
  FAQ_CARD_LIST: 'faqCardList',
};
