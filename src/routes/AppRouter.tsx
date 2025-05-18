import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from 'react-router-dom';
import { Suspense } from 'react';
import { PATH } from '@/routes/path';
import { GlobalLayout, Loading } from '@/components';
import { NotFound, Home, SellerProfile, SellerMyPage } from '@/pages';

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
        path: PATH.SELLER_PROFILE.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SellerProfile />,
          },
        ],
      },
      {
        path: PATH.SELLER.base,
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <Navigate to={PATH.SELLER.mypage.profile} replace />,
          },
          {
            path: PATH.SELLER.mypage.profile,
            element: <SellerMyPage />,
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
