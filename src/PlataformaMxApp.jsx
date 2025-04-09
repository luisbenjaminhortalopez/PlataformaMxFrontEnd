import { createBrowserRouter, RouterProvider } from 'react-router'
import { AppRouter } from './router'
import './style.css';


const router = createBrowserRouter( AppRouter );

export const PlataformaMxApp = () => {
    return (
        <RouterProvider router = { router } />
    );
};
