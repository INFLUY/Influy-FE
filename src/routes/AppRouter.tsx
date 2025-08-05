import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { PATH } from '@/routes/path';
import { GlobalLayout, LoadingSpinner } from '@/components';
import {
  NotFound,
  HomePage,
  SellerProfilePage,
  SellerMyProfile,
  ItemRegistrationPage,
  ItemFaqTab,
  ItemInfoTab,
  AnnouncementPage,
  ErrorPage,
  SellerMyProfileEditPage,
  FaqRegistrationPage,
  FaqEditPage,
  SellerHomePage,
  CategoryPage,
  EndingSoonPage,
  SplashScreen,
  LoginPage,
  UserTypeSelectPage,
  SignupIdPage,
  SignupInterestPage,
  SignupSnsLinkPage,
  WelcomePage,
  SignupEmailPage,
  SellerItemDetailPage,
  LikePage,
  MyPage,
  KakaoLoginHandler,
  CalendarPage,
  SellerCalendarPage,
  AccountSettingsPage,
  NicknamePage,
  NotificationSettingsPage,
  MyQuestion,
  DeleteAccountPage,
  UsernamePage,
  SupportPage,
  SupportFaqPage,
  SellerSettingsPage,
  SellerAccountSettingsPage,
  SellerTalkBoxItemListPage,
  BulkReplyPage,
  QuestionsListPage,
  PendingQuestionsTab,
  AnsweredQuestionsTab,
  TalkBoxCategoryPage,
  TalkBoxSettingPage,
  OnboardingIntroPage,
  DefaultMessageSettingPage,
  PendingCategoryTab,
  AnsweredCategoryTab,
  OnboardingLayout,
  SellerDeleteAccountPage,
  UserItemDetailPage,
  UserChatPage,
} from '@/pages';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import SellerRoute from './SellerRoute';
import UserRoute from './UserRoute';

const LikeItemTab = lazy(() => import('@/pages/user/like/LikeItemTab'));
const LikeInfluencerTab = lazy(
  () => import('@/pages/user/like/LikeInfluencerTab')
);

const SelectionTab = lazy(() => import('@/pages/user/market/SelectionTab'));
const ReviewTab = lazy(() => import('@/pages/user/market/ReviewTab'));

const MySelectionTab = lazy(
  () => import('@/pages/seller/sellerMyPage/MySelectionTab')
);
const MyItemReviewTab = lazy(
  () => import('@/pages/seller/sellerMyPage/MyItemReviewTab')
);
const MyStoredItemTab = lazy(
  () => import('@/pages/seller/sellerMyPage/MyStoredItemTab')
);

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <Suspense fallback={<LoadingSpinner />}>
          <GlobalLayout>
            <Outlet />
          </GlobalLayout>
        </Suspense>
      </ErrorBoundary>
    ),
    children: [
      {
        index: true,
        element: <SplashScreen />,
      },
      {
        path: PATH.LOGIN.BASE,
        element: <LoginPage />,
      },
      {
        path: PATH.OAUTH.BASE,
        element: <KakaoLoginHandler />,
      },
      {
        path: PATH.REGISTER.BASE,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to={PATH.REGISTER.TYPE.BASE} replace />,
          },
          {
            path: PATH.REGISTER.TYPE.BASE,
            element: <UserTypeSelectPage />,
          },
          {
            path: PATH.REGISTER.TYPE.USER.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to={PATH.REGISTER.TYPE.USER.ID} replace />,
              },
              {
                path: PATH.REGISTER.TYPE.USER.ID,
                element: <SignupIdPage />,
              },
              {
                path: PATH.REGISTER.TYPE.USER.INTEREST,
                element: <SignupInterestPage />,
              },
            ],
          },
          {
            path: PATH.REGISTER.TYPE.SELLER.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to={PATH.REGISTER.TYPE.SELLER.ID} replace />,
              },
              {
                path: PATH.REGISTER.TYPE.SELLER.ID,
                element: <SignupIdPage />,
              },
              {
                path: PATH.REGISTER.TYPE.SELLER.SNS,
                element: <SignupSnsLinkPage />,
              },
              {
                path: PATH.REGISTER.TYPE.SELLER.EMAIL,
                element: <SignupEmailPage />,
              },
              {
                path: PATH.REGISTER.TYPE.SELLER.INTEREST,
                element: <SignupInterestPage />,
              },
            ],
          },
        ],
      },
      {
        path: PATH.WELCOME.BASE,
        element: <WelcomePage />,
      },

      // 유저뷰
      {
        path: PATH.HOME.BASE,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: PATH.HOME.MORE.ENDING_SOON,
            element: <EndingSoonPage />,
          },
          {
            path: PATH.HOME.MORE.CATEGORY.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: (
                  <Navigate to={PATH.HOME.MORE.CATEGORY.DETAIL} replace />
                ),
              },
              {
                path: PATH.HOME.MORE.CATEGORY.DETAIL,
                element: <CategoryPage />,
              },
            ],
          },
        ],
      },
      {
        path: PATH.MARKET.BASE,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <NotFound />,
          },
          {
            path: PATH.MARKET.DETAIL.BASE,
            element: <SellerProfilePage />,
            children: [
              {
                index: true,
                element: (
                  <Navigate to={PATH.MARKET.DETAIL.TABS.SELECTION} replace />
                ),
              },
              {
                path: PATH.MARKET.DETAIL.TABS.SELECTION,
                element: <SelectionTab />,
              },
              {
                path: PATH.MARKET.DETAIL.TABS.REVIEW,
                element: <ReviewTab />,
              },
            ],
          },
          {
            path: PATH.MARKET.DETAIL.BASE,
            element: <Outlet />,
            children: [
              {
                path: PATH.MARKET.DETAIL.ITEM.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <NotFound />,
                  },
                  {
                    path: PATH.MARKET.DETAIL.ITEM.ITEM_ID,
                    children: [
                      { index: true, element: <UserItemDetailPage /> },
                      {
                        path: PATH.MARKET.DETAIL.ITEM.TALK_BOX,
                        element: <UserRoute />,
                        children: [{ index: true, element: <UserChatPage /> }],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '',
        element: <UserRoute />,
        children: [
          // 찜
          {
            path: PATH.LIKE.BASE,
            element: (
              <LikePage>
                <Outlet />
              </LikePage>
            ),
            children: [
              {
                index: true,
                element: <Navigate to={PATH.LIKE.TABS.ITEM} replace />,
              },
              {
                path: PATH.LIKE.TABS.ITEM,
                element: <LikeItemTab />,
              },
              {
                path: PATH.LIKE.TABS.SELLER,
                element: <LikeInfluencerTab />,
              },
            ],
          },

          // 캘린더
          {
            path: PATH.CALENDAR.BASE,
            element: <CalendarPage />,
          },

          // 마이
          {
            path: PATH.MY.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <MyPage />,
              },
              {
                path: PATH.MY.MY_QUESTION,
                element: <MyQuestion />,
              },
              {
                path: PATH.MY.NOTIFICATION,
                element: <NotificationSettingsPage />,
              },
              {
                path: PATH.MY.NICKNAME,
                element: <NicknamePage />,
              },
              {
                path: PATH.MY.ACCOUNT_SETTING.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <AccountSettingsPage />,
                  },
                  {
                    path: PATH.MY.ACCOUNT_SETTING.ID,
                    element: <UsernamePage />,
                  },
                  {
                    path: PATH.MY.ACCOUNT_SETTING.DELETE,
                    element: <DeleteAccountPage />,
                  },
                ],
              },
              {
                path: PATH.MY.SUPPORT.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SupportPage />,
                  },
                  {
                    path: PATH.MY.SUPPORT.FAQ,
                    element: <SupportFaqPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // 셀러뷰
      {
        path: PATH.SELLER.BASE,
        element: <SellerRoute />,
        children: [
          {
            index: true,
            element: <Navigate to={PATH.SELLER.HOME.BASE} replace />,
          },

          // 홈
          {
            path: PATH.SELLER.HOME.BASE,
            element: <SellerHomePage />,
          },

          // 캘린더
          {
            path: PATH.SELLER.CALENDER.BASE,
            element: <SellerCalendarPage />,
          },

          // 마이
          {
            path: PATH.SELLER.MY.BASE,
            element: <SellerMyProfile />,
            children: [
              {
                index: true,
                element: (
                  <Navigate to={PATH.SELLER.MY.TABS.SELECTION} replace />
                ),
              },
              {
                path: PATH.SELLER.MY.TABS.SELECTION,
                element: <MySelectionTab />,
              },
              {
                path: PATH.SELLER.MY.TABS.ARCHIVE,
                element: <MyStoredItemTab />,
              },
              {
                path: PATH.SELLER.MY.TABS.REVIEW,
                element: <MyItemReviewTab />,
              },
            ],
          },
          {
            path: PATH.SELLER.MY.BASE,
            element: <Outlet />,
            children: [
              {
                path: PATH.SELLER.MY.PREVIEW.BASE,
                element: <SellerProfilePage />,
                children: [
                  {
                    index: true,
                    element: (
                      <Navigate
                        to={PATH.SELLER.MY.PREVIEW.TABS.SELECTION}
                        replace
                      />
                    ),
                  },
                  {
                    path: PATH.SELLER.MY.PREVIEW.TABS.SELECTION,
                    element: <SelectionTab />,
                  },
                ],
              },
              {
                path: PATH.SELLER.MY.ANNOUNCEMENT.BASE,
                element: <AnnouncementPage />,
              },
              {
                path: PATH.SELLER.MY.PROFILE.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    path: PATH.SELLER.MY.PROFILE.EDIT,
                    element: <SellerMyProfileEditPage />,
                  },
                ],
              },
              {
                path: PATH.SELLER.MY.SETTING.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SellerSettingsPage />,
                  },
                  {
                    path: PATH.SELLER.MY.SETTING.NOTIFICATION,
                    element: <NotificationSettingsPage />,
                  },
                  {
                    path: PATH.SELLER.MY.SETTING.ACCOUNT_SETTING.BASE,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <SellerAccountSettingsPage />,
                      },
                      {
                        path: PATH.SELLER.MY.SETTING.ACCOUNT_SETTING.ID,
                        element: <UsernamePage />,
                      },
                      {
                        path: PATH.SELLER.MY.SETTING.ACCOUNT_SETTING.DELETE,
                        element: <SellerDeleteAccountPage />,
                      },
                    ],
                  },
                  {
                    path: PATH.SELLER.MY.SETTING.SUPPORT.BASE,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <SupportPage />,
                      },
                      {
                        path: PATH.SELLER.MY.SETTING.SUPPORT.FAQ,
                        element: <SupportFaqPage />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          // 아이템
          {
            path: PATH.SELLER.ITEM.BASE,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: (
                  <Navigate to={PATH.SELLER.ITEM.REGISTRATION.BASE} replace />
                ),
              },
              {
                path: PATH.SELLER.ITEM.REGISTRATION.BASE,
                element: <ItemRegistrationPage mode="create" />,
                children: [
                  {
                    index: true,
                    element: <ItemInfoTab mode="create" />,
                  },
                ],
              },
              {
                path: PATH.SELLER.ITEM.ITEM_ID.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SellerItemDetailPage />, // 셀러 상품 상세페이지
                  },
                  {
                    path: PATH.SELLER.ITEM.ITEM_ID.EDIT.BASE,
                    element: <ItemRegistrationPage mode="edit" />,
                    children: [
                      {
                        index: true,
                        element: (
                          <Navigate
                            to={PATH.SELLER.ITEM.ITEM_ID.EDIT.TABS.INFO}
                            replace
                          />
                        ),
                      },
                      {
                        path: PATH.SELLER.ITEM.ITEM_ID.EDIT.TABS.INFO,
                        element: <ItemInfoTab mode="edit" />,
                      },
                      {
                        path: PATH.SELLER.ITEM.ITEM_ID.EDIT.TABS.FAQ,
                        element: <ItemFaqTab />,
                      },
                    ],
                  },
                  {
                    path: PATH.SELLER.ITEM.FAQ.BASE,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <FaqRegistrationPage />, // (임시) FAQ 조회 페이지
                      },
                      {
                        path: PATH.SELLER.ITEM.FAQ.REGISTRATION.BASE,
                        element: <FaqRegistrationPage />,
                      },
                      {
                        path: PATH.SELLER.ITEM.FAQ.FAQ_ID.BASE,
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={PATH.SELLER.ITEM.FAQ.FAQ_ID.FAQ_DETAIL.EDIT}
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.ITEM.FAQ.FAQ_ID.FAQ_DETAIL.EDIT,
                            element: <FaqEditPage />, // 개별 FAQ 수정 페이지
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: PATH.SELLER.TALK_BOX.BASE, // /talk-box
            element: <Outlet />,
            children: [
              // 1. /talk-box/list
              {
                index: true,
                element: <Navigate to={PATH.SELLER.TALK_BOX.LIST} replace />,
              },
              {
                index: true,
                path: PATH.SELLER.TALK_BOX.LIST,
                element: <SellerTalkBoxItemListPage />,
              },

              // 2. /talk-box/item/:itemId
              {
                path: PATH.SELLER.TALK_BOX.ITEM.BASE, // item/:itemId
                element: <Outlet />,
                // element: (

                // ),
                children: [
                  {
                    element: (
                      <TalkBoxCategoryPage>
                        <Outlet />
                      </TalkBoxCategoryPage>
                    ),
                    children: [
                      {
                        index: true,
                        element: (
                          <Navigate
                            to={PATH.SELLER.TALK_BOX.ITEM.TABS.PENDING}
                            replace
                          />
                        ),
                      },
                      {
                        path: PATH.SELLER.TALK_BOX.ITEM.TABS.PENDING, // pending
                        element: <PendingCategoryTab />,
                      },
                      {
                        path: PATH.SELLER.TALK_BOX.ITEM.TABS.ANSWERED, // answered
                        element: <AnsweredCategoryTab />,
                      },
                    ],
                  },

                  // /talk-box/item/:itemId/category/:categoryId
                  {
                    path: PATH.SELLER.TALK_BOX.ITEM.CATEGORY.BASE, // category/:categoryId
                    element: <Outlet />,
                    children: [
                      {
                        element: (
                          <QuestionsListPage>
                            <Outlet />
                          </QuestionsListPage>
                        ),
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={
                                  PATH.SELLER.TALK_BOX.ITEM.CATEGORY.TABS
                                    .PENDING
                                }
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.TALK_BOX.ITEM.CATEGORY.TABS
                              .PENDING,
                            element: <PendingQuestionsTab />,
                          },
                          {
                            path: PATH.SELLER.TALK_BOX.ITEM.CATEGORY.TABS
                              .ANSWERED,
                            element: <AnsweredQuestionsTab />,
                          },
                        ],
                      },
                      {
                        path: PATH.SELLER.TALK_BOX.ITEM.CATEGORY.BULK_REPLY,
                        element: <BulkReplyPage />,
                      },
                    ],
                  },
                  {
                    path: PATH.SELLER.TALK_BOX.ITEM.SETTING.BASE,
                    element: <Outlet />,
                    children: [
                      { index: true, element: <TalkBoxSettingPage /> },
                      {
                        index: true,
                        path: PATH.SELLER.TALK_BOX.ITEM.SETTING.DEFAULT_MESSAGE,
                        element: <DefaultMessageSettingPage />,
                      },
                    ],
                  },
                ],
              },
              {
                path: PATH.SELLER.TALK_BOX.ONBOARDING.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <OnboardingIntroPage />,
                  },
                  {
                    path: PATH.SELLER.TALK_BOX.ONBOARDING.START,
                    element: <OnboardingLayout />,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
