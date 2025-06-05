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
                element: <Outlet />,
                children: [
                  {
                    index: true,
                    element: <ItemRegistrationPage />,
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
