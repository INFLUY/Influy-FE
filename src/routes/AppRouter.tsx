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
import CalendarPage from '@/pages/user/calendar/CalendarPage';
import SellerCalendarPage from '@/pages/seller/calendar/CalendarPage';

const SelectionTab = lazy(
  () => import('@/pages/user/sellerProfile/SelectionTab')
);
const ReviewTab = lazy(() => import('@/pages/user/sellerProfile/ReviewTab'));

const MySelectionTab = lazy(
  () => import('@/pages/seller/sellerMyPage/MySelectionTab')
);
const MyITEMReviewTab = lazy(
  () => import('@/pages/seller/sellerMyPage/MyItemReviewTab')
);
const MyStoredITEMTab = lazy(
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
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <LoginPage />,
          },
        ],
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
            path: PATH.HOME.MORE.CATEGORY,
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: PATH.MARKET.BASE,
        element: (
          <SellerProfile>
            <Outlet />
          </SellerProfile>
        ),
        children: [
          {
            index: true,
            element: <Navigate to={PATH.MARKET.TABS.SELECTION} replace />,
          },
          {
            path: PATH.MARKET.TABS.SELECTION,
            element: <SelectionTab />,
          },
          {
            path: PATH.MARKET.TABS.REVIEW,
            element: <ReviewTab />,
          },
        ],
      },
      // 캘린더
      {
        path: PATH.CALENDAR.BASE,
        element: <CalendarPage />,
      },

      // 셀러뷰
      {
        path: PATH.SELLER.BASE,
        element: <SellerAuthInterceptor />,
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
            element: (
              <SellerMyProfile>
                <Outlet />
              </SellerMyProfile>
            ),
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
                element: <MyStoredITEMTab />,
              },
              {
                path: PATH.SELLER.MY.TABS.REVIEW,
                element: <MyITEMReviewTab />,
              },
            ],
          },
          {
            path: PATH.SELLER.MY.BASE,
            element: <Outlet />,
            children: [
              {
                path: PATH.SELLER.MY.NOTICE.BASE,
                element: <Notice />,
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
                element: <ItemRegistrationPage />,
                children: [
                  {
                    index: true,
                    element: <ItemInfoTab mode="create" />,
                  },
                ],
              },
              {
                path: PATH.SELLER.ITEM.ADMINISTRATION.BASE,
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <SellerItemDetailPage />, // 셀러 상품 상세페이지
                  },
                  {
                    path: PATH.SELLER.ITEM.ADMINISTRATION.EDIT.BASE,
                    element: <ItemRegistrationPage />,
                    children: [
                      {
                        index: true,
                        element: (
                          <Navigate
                            to={PATH.SELLER.ITEM.ADMINISTRATION.EDIT.TABS.INFO}
                            replace
                          />
                        ),
                      },
                      {
                        path: PATH.SELLER.ITEM.ADMINISTRATION.EDIT.TABS.INFO,
                        element: <ItemInfoTab mode="edit" />,
                      },
                      {
                        path: PATH.SELLER.ITEM.ADMINISTRATION.EDIT.TABS.FAQ,
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
                        path: PATH.SELLER.ITEM.FAQ.ADMINISTRATION.BASE,
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={
                                  PATH.SELLER.ITEM.FAQ.ADMINISTRATION.FAQ_DETAIL
                                    .EDIT
                                }
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.ITEM.FAQ.ADMINISTRATION.FAQ_DETAIL
                              .EDIT,
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
