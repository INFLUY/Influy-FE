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
  Home,
  SellerProfile,
  SellerMyProfile,
  SelectionTab,
  ReviewTab,
  ItemRegistrationPage,
  MySelectionTab,
  MyItemReviewTab,
  MyStoredItemTab,
  Notice,
  ErrorPage,
  SellerMyProfileEditPage,
  FaqRegistrationPage,
  SellerItemDetailPage,
  FaqEditPage,
  SplashScreen,
  LoginPage,
} from '@/pages';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { SellerAuthInterceptor } from './AuthInterceptor';

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
        path: PATH.HOME.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Home />,
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
                path: PATH.SELLER.items.item.registration,
                element: <ItemRegistrationPage />,
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
