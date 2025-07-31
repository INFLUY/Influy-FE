export const ACCESS_TOKEN_KEY = 'InfluyAccessToken';

export const API_DOMAINS = {
  //common
  PRESIGNED_URL: '/image/presigned-url',
  OAUTH_KAKAO: '/oauth/kakao',
  REISSUE: '/member/auth/reissue',
  ID_DUPLICATE_CHECK: '/member/register/duplicate-check',
  SELLER_MARKET: '/user/:sellerId/market',
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
  USER_PROFILE: '/member/:memberId/profile',
  USER_MY_PROFILE: '/member/profile',

  HOME_RECOMMEND: '/home/recommend',
  HOME_POPULAR: '/home/popular',
  HOME_CLOSE_DEADLINE: '/home/close-deadline',
};

export const SELLER_API_DOMAINS = {
  SELLER_MY_PROFILE: '/seller/profile',
  SELLER_MY_HOME_QUESTIONS: '/seller/home/questions',
  SELLER_MY_MARKET: '/seller/my-market',
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

  SELLER_MY_PROFILE: 'sellerMyProfile',
  SELLER_MY_MARKET: 'sellerMyMarket',
  SELLER_MY_HOME_QUESTIONS: 'sellerMyHomeQuestions',

  USER_PROFILE: 'userProfile',

  HOME_RECOMMEND: 'homeRecommend',
  HOME_POPULAR: 'homePopular',
  HOME_CLOSE_DEADLINE: 'closeDeadline',
};
