import { RefObject, createRef } from 'react';
import { RouteObject, createHashRouter } from 'react-router-dom';
import Welcome from '@/pages/Welcome';
import Editor from '@/pages/Editor';
import AppRoutes from '@/components/AppRoutes';

export type RouteItem = RouteObject & { nodeRef: RefObject<HTMLDivElement> };
const routes: RouteItem[] = [
  {
    path: '/welcome',
    element: <Welcome />,
    nodeRef: createRef(),
  },
  {
    path: '/editor',
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

export default router;
