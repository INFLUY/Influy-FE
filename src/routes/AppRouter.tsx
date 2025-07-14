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
  SellerProfile,
  SellerMyProfile,
  ItemRegistrationPage,
  ItemFaqTab,
  ItemInfoTab,
  Notice,
  ErrorPage,
  SellerMyProfileEditPage,
  FaqRegistrationPage,
  SellerItemDetailPage,
  FaqEditPage,
  SellerHomePage,
  CategoryPage,
  TrendingPage,
  EndingSoonPage,
  SplashScreen,
  LoginPage,
  UserTypeSelectPage,
  SignupIdPage,
  SignupInterestPage,
  SignupSnsLinkPage,
  WelcomePage,
  SignupEmailPage,
  SellerTalkBoxItemListPage,
  BulkReplyPage,
  QuestionsListPage,
  PendingQuestionsTab,
  AnsweredQuestionsTab,
  TalkBoxCategoryPage,
  PendingCategoryTab,
  AnsweredCategoryTab,
} from '@/pages';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SellerAuthInterceptor } from './AuthInterceptor';

const SelectionTab = lazy(
  () => import('@/pages/user/sellerProfile/SelectionTab')
);
const ReviewTab = lazy(() => import('@/pages/user/sellerProfile/ReviewTab'));

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
        path: PATH.LOGIN.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
      },
      {
        path: PATH.REGISTER.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to={PATH.REGISTER.type.base} replace />,
          },
          {
            path: PATH.REGISTER.type.base,
            element: <UserTypeSelectPage />,
          },
          {
            path: PATH.REGISTER.type.user.base,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to={PATH.REGISTER.type.user.id} replace />,
              },
              {
                path: PATH.REGISTER.type.user.id,
                element: <SignupIdPage />,
              },
              {
                path: PATH.REGISTER.type.user.interest,
                element: <SignupInterestPage />,
              },
            ],
          },
          {
            path: PATH.REGISTER.type.seller.base,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Navigate to={PATH.REGISTER.type.seller.id} replace />,
              },
              {
                path: PATH.REGISTER.type.seller.id,
                element: <SignupIdPage />,
              },
              {
                path: PATH.REGISTER.type.seller.sns,
                element: <SignupSnsLinkPage />,
              },
              {
                path: PATH.REGISTER.type.seller.email,
                element: <SignupEmailPage />,
              },
            ],
          },
        ],
      },
      {
        path: PATH.WELCOME.base,
        element: <WelcomePage />,
      },
      {
        path: PATH.HOME.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: PATH.USER.base,
        element: (
          <SellerProfile>
            <Outlet />
          </SellerProfile>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={PATH.USER.tabs.selection} replace />,
          },
          {
            path: PATH.USER.tabs.selection,
            element: <SelectionTab />,
          },
          {
            path: PATH.USER.tabs.review,
            element: <ReviewTab />,
          },
        ],
      },
      {
        path: PATH.SELLER.base,
        element: (
          <SellerMyProfile>
            <SellerAuthInterceptor />
          </SellerMyProfile>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={PATH.SELLER.tabs.selection} replace />,
          },
          {
            path: PATH.SELLER.tabs.selection,
            element: <MySelectionTab />,
          },
          {
            path: PATH.SELLER.tabs.stored,
            element: <MyStoredItemTab />,
          },
          {
            path: PATH.SELLER.tabs.review,
            element: <MyItemReviewTab />,
          },
        ],
      },
      {
        path: PATH.SELLER.base,
        element: <Outlet />,
        children: [
          {
            path: PATH.SELLER.home.base,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <SellerHomePage />,
              },
              {
                path: PATH.SELLER.home.more.endingSoon,
                element: <EndingSoonPage />,
              },
              {
                path: PATH.SELLER.home.more.trending,
                element: <TrendingPage />,
              },
              {
                path: PATH.SELLER.home.more.category,
                element: <CategoryPage />,
              },
            ],
          },
          {
            path: PATH.SELLER.notice.base,
            element: <Outlet />,
            children: [
              {
                index: true,
                element: <Notice />,
              },
            ],
          },
          {
            path: PATH.SELLER.profile.base,
            element: <Outlet />,
            children: [
              {
                index: true,
                path: PATH.SELLER.profile.edit,
                element: <SellerMyProfileEditPage />,
              },
            ],
          },
          {
            path: PATH.SELLER.items.base,
            element: <Outlet />,
            children: [
              {
                path: PATH.SELLER.items.item.registration.base,
                element: <ItemRegistrationPage />, // 더 이상 중첩 X
                children: [
                  {
                    index: true,
                    element: (
                      <Navigate
                        to={PATH.SELLER.items.item.registration.tabs.info}
                        replace
                      />
                    ),
                  },
                  {
                    path: PATH.SELLER.items.item.registration.tabs.info,
                    element: <ItemInfoTab />, // 새로 분리한 컴포넌트
                  },
                  {
                    path: PATH.SELLER.items.item.registration.tabs.faq,
                    element: <ItemFaqTab />, // 새로 분리한 컴포넌트
                  },
                ],
              },

              {
                path: PATH.SELLER.items.item.administration.base,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    path: PATH.SELLER.items.item.administration.itemDetail
                      .published,
                    element: <SellerItemDetailPage />, // 게시한 상품 조회 페이지
                  },
                  {
                    index: true,
                    path: PATH.SELLER.items.item.administration.itemDetail
                      .archived,
                    element: <SellerItemDetailPage />, // 보관한 상품 조회 페이지
                  },
                  {
                    path: PATH.SELLER.items.item.administration.faq.base,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <FaqRegistrationPage />, // (임시) faq 조회 페이지
                      },
                      {
                        path: PATH.SELLER.items.item.administration.faq
                          .registration.base,
                        element: <FaqRegistrationPage />,
                      },
                      {
                        path: PATH.SELLER.items.item.administration.faq
                          .administration.base,
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={
                                  PATH.SELLER.items.item.administration.faq
                                    .administration.faqDetail.edit
                                }
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.items.item.administration.faq
                              .administration.faqDetail.edit,
                            element: <FaqEditPage />, // 개별 faq 수정 페이지
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
            path: PATH.SELLER.talkBox.base, // /talk-box
            element: <Outlet />,
            children: [
              // 1. /talk-box/list
              {
                index: true,
                path: PATH.SELLER.talkBox.list,
                element: <SellerTalkBoxItemListPage />,
              },

              // 2. /talk-box/item/:itemId/category
              {
                path: PATH.SELLER.talkBox.item.base, // item/:itemId
                element: <TalkBoxCategoryPage />,
                children: [
                  {
                    index: true,
                    element: (
                      <Navigate
                        to={PATH.SELLER.talkBox.item.tabs.pending}
                        replace
                      />
                    ),
                  },
                  {
                    path: PATH.SELLER.talkBox.item.tabs.pending, // pending
                    element: <PendingCategoryTab />,
                  },
                  {
                    path: PATH.SELLER.talkBox.item.tabs.answered, // answered
                    element: <AnsweredCategoryTab />,
                  },
                  // 3. /talk-box/item/:itemId/category/:categoryId
                  {
                    path: PATH.SELLER.talkBox.item.category.base, // category/:categoryId
                    element: <QuestionsListPage />,
                    children: [
                      {
                        index: true,
                        element: (
                          <Navigate
                            to={PATH.SELLER.talkBox.item.category.tabs.pending}
                            replace
                          />
                        ),
                      },
                      {
                        path: PATH.SELLER.talkBox.item.category.tabs.pending,
                        element: <PendingQuestionsTab />,
                      },
                      {
                        path: PATH.SELLER.talkBox.item.category.tabs.answered,
                        element: <AnsweredQuestionsTab />,
                      },
                      {
                        path: PATH.SELLER.talkBox.item.category.bulkReply,
                        element: <BulkReplyPage />,
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
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
