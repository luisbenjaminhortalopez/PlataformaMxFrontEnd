import { Navigate } from 'react-router';
import { AdministradorNoticias, AdministradorPublicidad } from '../../modules';


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
