import { Outlet } from "react-router";

export const HomePage = () => {
    return(
        <>
            <Outlet />
            <div> Home </div>
        </>
    );
};