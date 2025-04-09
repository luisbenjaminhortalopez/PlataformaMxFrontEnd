import { Outlet } from "react-router";

export const AdminPage = () => {
    return(
        <>
            El Sidebar va aquí
            <br />
            <br />
            <Outlet />
        </>
    );
};