import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="logo">Prototype Project</h1>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/pathfinding">2D Map</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">© {new Date().getFullYear()} Prototype Project. All rights reserved.</footer>
    </div>
  );
};
