import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../components";
import { HamburguerButton } from "../components";

export const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen relative">
      {!sidebarOpen && (
        <HamburguerButton
          toggleSidebar={toggleSidebar}
          text="black"
          className="absolute top-4 left-4 z-50 p-1"
        />
      )}

      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

      <main className="flex-1 bg-white px-10 py-10 overflow-y-auto pl-72">
        <Outlet />
      </main>
    </div>
  );
};
