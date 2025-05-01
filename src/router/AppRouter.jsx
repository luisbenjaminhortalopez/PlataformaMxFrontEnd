import { AdminPage } from '../modules/admin';
import { HomePage, LoginPage } from '../modules';
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
