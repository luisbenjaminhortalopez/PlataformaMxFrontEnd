import { useState } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "../components";
import { HamburguerButton } from "../components";

export const AdminPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen relative">
      {!sidebarOpen && (
        <HamburguerButton
          toggleSidebar={ toggleSidebar }
          text="black"
          className={"absolute top-4 left-4 z-50 p-1"}
        />
      )}

      {sidebarOpen && (
        <Sidebar toggleSidebar={toggleSidebar} />
      )}
      <main className="flex-1 bg-white flex items-center justify-center">
        <Outlet />
      </main>
    </div>
  );
};
