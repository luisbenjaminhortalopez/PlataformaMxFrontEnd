import { Outlet } from "react-router";
import { Sidebar } from "../../components";
import { useState } from "react";
import Logo from '../assets/MenuIcon.svg';

export const AdminPage = () => {
  
  const [ sidebarOpen , setSidebarOpen ] = useState( true );

  const toggleSidebar = () => setSidebarOpen( !sidebarOpen );

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};