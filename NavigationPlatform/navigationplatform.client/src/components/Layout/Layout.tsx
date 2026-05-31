import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";


export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <nav className="bg-[#00495F] text-left px-4 py-3">
          <h1 className="font-medium text-[#FFF0EA]">Gebouw</h1>
      </nav>

      <main className="flex-1 flex justify-center p-6 bg-[#FFF0EA]">
        <div className="bg-[#FFF0EA]">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">© {new Date().getFullYear()} Prototype Project. All rights reserved.</footer>
    </div>
  );
};
