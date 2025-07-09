"use client";

import { useState } from "react";
import { HamburguerButton } from "./hamburguer-button";
import { Sidebar } from "./sidebar";

type Props = {
  children: React.ReactNode;
};

export const AdminLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen relative">
      {!sidebarOpen && (
        <div className="fixed top-0 left-0 z-50 px-4 pt-4">
          <HamburguerButton
            toggleSidebar={toggleSidebar}
            text="black"
            className="p-1"
          />
        </div>
      )}

      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}

      <main
        className={`flex-1 bg-white px-10 py-10 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "pl-72" : "pl-10"
        }`}
      >
        {children}
      </main>
    </div>
  );
};
