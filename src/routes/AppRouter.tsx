import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Suspense } from 'react';
import { PATH } from '@/routes/path';
import { GlobalLayout, Loading } from '@/components';
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
  FaqRegistrationCategoryPage,
  SellerItemDetailPage,
} from '@/pages';

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    element: (
      <Suspense fallback={<Loading />}>
        <GlobalLayout>
          <Outlet />
        </GlobalLayout>
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={PATH.HOME.base} replace />,
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
            <Outlet />
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
                      .saved,
                    element: <SellerItemDetailPage />, // 보관한 상품 조회 페이지
                  },
                  {
                    path: PATH.SELLER.items.item.administration.faq.base,
                    element: <Outlet />,
                    children: [
                      {
                        index: true,
                        element: <FaqRegistrationCategoryPage />, // (임시) faq 조회 페이지
                      },
                      {
                        path: PATH.SELLER.items.item.administration.faq
                          .registration.base,
                        element: <Outlet />,
                        children: [
                          {
                            index: true,
                            element: (
                              <Navigate
                                to={
                                  PATH.SELLER.items.item.administration.faq
                                    .registration.category
                                }
                                replace
                              />
                            ),
                          },
                          {
                            path: PATH.SELLER.items.item.administration.faq
                              .registration.category,
                            element: <FaqRegistrationCategoryPage />,
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
