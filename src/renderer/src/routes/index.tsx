import { RefObject, createRef } from 'react';
import {
  RouteObject,
  createHashRouter,
  RouterProvider,
} from 'react-router-dom';
import Editor from '@/pages/Editor';
import AppRoutes from '@/components/AppRoutes';
import AppLayout from '@/components/AppLayout';

export type RouteItem = RouteObject & { nodeRef: RefObject<HTMLDivElement> };
const routes: RouteItem[] = [
  {
    path: '/',
    element: <Editor />,
    nodeRef: createRef(),
  },
];

const router = createHashRouter([
  {
    path: '/',
    element: <AppRoutes routes={routes} />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
    })),
  },
]);

const AppRoute = () => (
  <AppLayout>
    <RouterProvider router={router} />
  </AppLayout>
);

export default AppRoute;
