import { Outlet } from "react-router";

export const HomePage = () => {

    return(
        <div className="flex items-center justify-center h-screen bg-dos bg-blue-400">
            <h1 className="text-3xl font-bold text-tres">
                Home
            </h1>
            <Outlet />
        </div>
    );
};