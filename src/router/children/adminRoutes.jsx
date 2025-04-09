import { Navigate } from 'react-router';
import { AdministradorNoticias } from '../../pages/admin/AdministradorNoticias';
import { AdministradorPublicidad } from '../../pages/admin/AdministradorPublicidad';


export const adminRoutes = [
  {
    index: true,
    element: <Navigate to="noticias" replace />,
  },
  {
    path: 'noticias',
    element: <AdministradorNoticias />,
  },
  {
    path: 'publicidad',
    element: <AdministradorPublicidad />,
  },
];
