import { AdminPage, HomePage, LoginPage } from '../pages';
import { adminRoutes } from './children';

export const AppRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    children: adminRoutes,
  },
];
