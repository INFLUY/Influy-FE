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
  EndingSoonPage,
  SplashScreen,
  LoginPage,
  UserTypeSelectPage,
  SignupIdPage,
  SignupInterestPage,
  SignupSnsLinkPage,
  WelcomePage,
  SignupEmailPage,
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

      // 유저뷰
      {
        path: PATH.HOME.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: PATH.HOME.more.endingSoon,
            element: <EndingSoonPage />,
          },
          {
            path: PATH.HOME.more.category,
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: PATH.MARKET.base,
        element: (
          <SellerProfile>
            <Outlet />
          </SellerProfile>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={PATH.MARKET.tabs.selection} replace />,
          },
          {
            path: PATH.MARKET.tabs.selection,
            element: <SelectionTab />,
          },
          {
            path: PATH.MARKET.tabs.review,
            element: <ReviewTab />,
          },
        ],
      },

      // 셀러뷰
      {
        path: PATH.SELLER.base,
        element: <SellerAuthInterceptor />,
        children: [
          {
            index: true,
            element: <Navigate to={PATH.SELLER.home.base} replace />,
          },

          // 홈
          {
            path: PATH.SELLER.home.base,
            element: <SellerHomePage />,
          },

          // 마이
          {
            path: PATH.SELLER.my.base,
            element: (
              <SellerMyProfile>
                <Outlet />
              </SellerMyProfile>
            ),
            children: [
              {
                index: true,
                element: (
                  <Navigate to={PATH.SELLER.my.tabs.selection} replace />
                ),
              },
              {
                path: PATH.SELLER.my.tabs.selection,
                element: <MySelectionTab />,
              },
              {
                path: PATH.SELLER.my.tabs.stored,
                element: <MyStoredItemTab />,
              },
              {
                path: PATH.SELLER.my.tabs.review,
                element: <MyItemReviewTab />,
              },
            ],
          },
          {
            path: PATH.SELLER.my.base,
            element: <Outlet />,
            children: [
              {
                path: PATH.SELLER.my.notice.base,
                element: <Notice />,
              },
              {
                path: PATH.SELLER.my.profile.base,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    path: PATH.SELLER.my.profile.edit,
                    element: <SellerMyProfileEditPage />,
                  },
                ],
              },
            ],
          },
          // 아이템
          {
            path: PATH.SELLER.item.base,
            element: <Outlet />,
            children: [
              {
                path: PATH.SELLER.item.registration.base,
                element: <ItemRegistrationPage />,
                children: [
                  {
                    index: true,
                    element: <ItemInfoTab mode="create" />,
                  },
                ],
              },
              {
                path: PATH.SELLER.item.administration.base,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SellerItemDetailPage />, // 셀러 상품 상세페이지
                  },
                  {
                    path: PATH.SELLER.item.administration.edit.base,
                    element: <ItemRegistrationPage />,
                    children: [
                      {
                        index: true,
                        element: (
                          <Navigate
                            to={PATH.SELLER.item.administration.edit.tabs.info}
                            replace
                          />
                        ),
                      },
                      {
                        path: PATH.SELLER.item.administration.edit.tabs.info,
                        element: <ItemInfoTab mode="edit" />,
                      },
                      {
                        path: PATH.SELLER.item.administration.edit.tabs.faq,
                        element: <ItemFaqTab />,
                      },
                    ],
                  },
                  {
                    path: PATH.SELLER.item.faq.base,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <FaqRegistrationPage />, // (임시) faq 조회 페이지
                      },
                      {
                        path: PATH.SELLER.item.faq.registration.base,
                        element: <FaqRegistrationPage />,
                      },
                      {
                        path: PATH.SELLER.item.faq.administration.base,
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={
                                  PATH.SELLER.item.faq.administration.faqDetail
                                    .edit
                                }
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.item.faq.administration.faqDetail
                              .edit,
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
