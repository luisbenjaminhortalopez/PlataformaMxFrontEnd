import { AdminPage } from '../modules/admin';
import { HomePage, LoginPage, DetailPage } from '../modules';
import { adminRoutes } from './children';

export const AppRouter = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/news/:id',
    element: <DetailPage />
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
