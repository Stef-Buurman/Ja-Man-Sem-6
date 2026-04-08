import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="logo">Pathfinding Prototype</h1>
          <nav className="nav-links">
            <Link to="/heatmap">Heatmap</Link>
            <Link to="/editor">Editor</Link>
          </nav>
        </div>
      </header>

      <main className="layout-main">
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>

      <footer className="layout-footer">
        © {new Date().getFullYear()} Indoor Navigation App
      </footer>
    </div>
  );
};