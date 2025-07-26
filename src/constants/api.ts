export const ACCESS_TOKEN_KEY = 'InfluyAccessToken';

export const API_DOMAINS = {
  //common
  OAUTH_KAKAO: '/oauth/kakao',
  REISSUE: '/member/auth/reissue',
  ID_DUPLICATE_CHECK: '/member/register/duplicate-check',
  SELLER_ANNOUNCEMENT: '/seller/:sellerId/announcements',
  SELLER_PRIMARY_ANNOUNCEMENT:
    '/seller/:sellerId/announcements/primary-announcement',

  ITEM_CATEGORIES: '/categories',

  // seller
  SELLER_MY_JOIN: '/member/register/seller',
  SELLER_MY_ANNOUNCEMENT: '/seller/announcements',
  SELLER_MY_ANNOUNCEMENT_DETAIL: '/seller/announcements/:announcementId',

  // user
  USER_JOIN: '/member/register/user',
};

export const QUERY_KEYS = {
  ID_DUPLICATE_CHECK: 'checkId',

  ITEM_CATEGORIES: 'itemCategories',

  // seller
  SELLER_ANNOUNCEMENT: 'sellerMyAnnouncements',
  SELLER_PRIMARY_ANNOUNCEMENT: 'sellerMyPrimaryAnnouncement',
};
